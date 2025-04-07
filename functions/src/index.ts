const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });
require("dotenv").config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || functions.config().openai.key;

exports.generateQuestions = functions.https.onRequest(async (req: any, res: any) => {
  cors(req, res, async () => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: req.body.messages,
        }),
      });

      const data = await response.json();
      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "OpenAI API call failed" });
    }
  });
});
