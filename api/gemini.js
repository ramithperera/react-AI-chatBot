// api/gemini.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: req.body.history,
    });
    const msg = req.body.message;
    const result = await chat.sendMessage(msg);
    const response = await result.response.text;
    const text = response.text();
    res.status(200).json({ text });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
