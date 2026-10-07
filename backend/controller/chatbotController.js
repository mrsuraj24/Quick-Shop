import OpenAI from "openai";
import fs from "fs";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import ChatMessage from "../models/chatbotModel.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve("backend/config/config.env"),
});

const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY,
});


// 🔹 AI RESPONSE FUNCTION
async function askAI(message, products = []) {
  const cleanProducts = products.map(p => ({
  name: p.name,
  price: `₹${p.price}`
}));
  const prompt = `
You are a smart e-commerce assistant.

User Query: ${message}

Available Products:
${JSON.stringify(cleanProducts)}

Rules:
- Understand the user's intent and respond naturally like a human
- If user greets (hi, hello, hey), respond with a friendly greeting
- If user talks normally, reply in a normal conversational way
- Do not add extra text or explanation
- Keep answer in 2-3 lines max
- give the only one product suggestion
- Give the answer according to the name of product that user search
- If no product matches, reply: "Sorry, this product is not available."
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}


// 🔹 CHAT + VOICE CONTROLLER
export const chatbotHandler = async (req, res) => {
  try {
    let { message } = req.body;
    const userId = req.user?._id || null;

    // 🎤 VOICE SUPPORT (if audio file comes)
    if (req.file) {
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(req.file.path),
        model: "gpt-4o-mini-transcribe",
      });

      message = transcription.text;
    }

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Save user message
    if (userId) {
      await ChatMessage.create({
        user: userId,
        role: "user",
        content: message,
      });
    }

    let reply = "";
    const lowerMsg = message.toLowerCase();

    // 🛒 PRODUCT SUGGESTION
    if (lowerMsg.includes("suggest") || lowerMsg.includes("recommend")) {
      const match = lowerMsg.match(/under\s+(\d+)/);
      const priceLimit = match ? Number(match[1]) : 20000;

      const products = await Product.find({ price: { $lte: priceLimit } })
        .limit(5)
        .select("title price description");

      if (!products.length) {
        reply = `No products found under ₹${priceLimit}`;
      } else {
        reply = await askAI(message, products);
      }
    }

    // 📦 ORDER TRACKING
    else if (lowerMsg.includes("track") && lowerMsg.includes("order")) {
      const match = lowerMsg.match(/order\s+([a-zA-Z0-9]+)/);
      const orderId = match ? match[1] : null;

      if (!orderId) {
        reply = "Please provide order ID. Example: track my order 123";
      } else {
        const order = await Order.findById(orderId);

        if (!order) {
          reply = "Order not found.";
        } else {
          reply = `Order status: ${order.orderStatus}. Total: ₹${order.totalPrice}`;
        }
      }
    }

    // 🤖 GENERAL CHAT
    else {
      const products = await Product.find().limit(5).select("title price");
      reply = await askAI(message, products);
    }

    // Save bot reply
    if (userId) {
      await ChatMessage.create({
        user: userId,
        role: "assistant",
        content: reply,
      });
    }

    res.json({
      success: true,
      message,
      reply,
    });

  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ message: "Chatbot error" });
  }
};