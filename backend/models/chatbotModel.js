import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
    },
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("ChatMessage", chatSchema);