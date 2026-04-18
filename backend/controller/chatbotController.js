import ChatMessage from "../models/chatbotModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

// Gemini setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Ask Gemini
async function askAI(message, products = []) {
  const prompt = `
You are an e-commerce assistant.

User query: ${message}

Available products:
${JSON.stringify(products)}

Rules:
- Only suggest products from the list
- Do not make up products
- Keep answers short and helpful
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text;
}

// SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?._id || null;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
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
        .select("name price description");

      if (!products.length) {
        reply = `No products found under ₹${priceLimit}`;
      } else {
        // Gemini से smart suggestion
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

    // 🤖 GENERAL AI CHAT
    else {
      const products = await Product.find().limit(5).select("name price");
      reply = await askAI(message, products);
    }

    // Save assistant message
    if (userId) {
      await ChatMessage.create({
        user: userId,
        role: "assistant",
        content: reply,
      });
    }

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chatbot error:", error);

    res.status(500).json({
      success: false,
      message: "Chatbot error",
    });
  }
};

// CHAT HISTORY
export const getHistory = async (req, res) => {
  try {
    const userId = req.user?._id;

    const messages = await ChatMessage.find({ user: userId }).sort({
      createdAt: 1,
    });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load chat history",
    });
  }
};