// import express from "express";
// // import { sendMessage, getHistory } from "../controller/chatbotController.js";
// import { searchWithAi } from "../controller/chatbotController.js";

// const router = express.Router();

// // router.post("/send", sendMessage);
// // router.get("/history", getHistory);

// export default router;


// router.post("/search", searchWithAi)


import express from "express";
import multer from "multer";
import { chatbotHandler } from "../controller/chatbotController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/chat", upload.single("audio"), chatbotHandler);

export default router;