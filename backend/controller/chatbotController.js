import axios from "axios";
import ChatMessage from "../models/ChatMessage.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Helper: Ask AI (OpenAI / Gemini style)
async function askAI(message) {
  const aiRes = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an e-commerce assistant. Help users track orders and suggest products in simple language.",
        },
        { role: "user", content: message },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return aiRes.data.choices[0].message.content;
}

// POST /api/chat/send
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id; // from auth middleware

    if (!message || !message.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }

    // Save user message
    await ChatMessage.create({
      user: userId,
      role: "user",
      content: message,
    });

    let reply = "";
    const lowerMsg = message.toLowerCase();

    // 🛒 1. Product suggestion: "suggest phone under 20000"
    if (lowerMsg.includes("suggest") && lowerMsg.includes("under")) {
      const match = lowerMsg.match(/under\s+(\d+)/);
      const priceLimit = match ? Number(match[1]) : 20000;

      const products = await Product.find({ price: { $lte: priceLimit } })
        .limit(5)
        .select("name price");

      if (!products || products.length === 0) {
        reply = `I couldn't find any products under ₹${priceLimit}.`;
      } else {
        reply = `Here are some products under ₹${priceLimit}:\n\n`;
        products.forEach((p, i) => {
          reply += `${i + 1}. ${p.name} - ₹${p.price}\n`;
        });
      }
    }

    // 📦 2. Order tracking: "track my order 123"
    else if (lowerMsg.includes("track") && lowerMsg.includes("order")) {
      const match = lowerMsg.match(/order\s+([a-zA-Z0-9]+)/);
      const orderId = match ? match[1] : null;

      if (!orderId) {
        reply = "Please provide your order ID. Example: Track my order 12345";
      } else {
        const order = await Order.findById(orderId);

        if (!order) {
          reply = "Sorry, I could not find that order.";
        } else {
          reply = `Your order status is: ${order.orderStatus}. Total amount: ₹${order.totalPrice}`;
        }
      }
    }

    // 🤖 3. Otherwise → Ask AI
    else {
      reply = await askAI(message);
    }

    // Save assistant message
    await ChatMessage.create({
      user: userId,
      role: "assistant",
      content: reply,
    });

    res.json({ success: true, reply });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ success: false, message: "Chatbot error" });
  }
};

// GET /api/chat/history
export const getHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const messages = await ChatMessage.find({ user: userId }).sort({
      createdAt: 1,
    });

    res.json({ success: true, messages });
  } catch (error) {
    console.error("Get history error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to load chat history" });
  }
};
