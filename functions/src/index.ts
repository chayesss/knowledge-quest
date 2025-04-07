const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });
const admin = require("firebase-admin");
require("dotenv").config();
admin.initializeApp();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || functions.config().openai.key;
const requests = new Map<string, { count: number; lastRequestTime: number }>();

const rateLimit = (maxRequests: number, windowMs: number) => {

  return async (req: any, res: any, next: Function) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ error: "Unauthorized: No token provided" });
    }
    const idToken = authHeader.split("Bearer ")[1];
    try {
      // Get the user ID after verifying the token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const userId = decodedToken.uid;
      // Check if the user already exists in the rate limiter map
      if (requests.has(userId)) {
        const userRequest = requests.get(userId);
        // If the user has reached the max requests in the given window
        if (userRequest && (userRequest.count >= maxRequests && Date.now() - userRequest.lastRequestTime < windowMs)) {
          return res.status(429).send({ error: "Too many requests, please try again later." });
        }

        // Reset counter if the time window has passed
        if (userRequest && (Date.now() - userRequest.lastRequestTime >= windowMs)) {
          userRequest.count = 0;
          userRequest.lastRequestTime = Date.now();
        }

        // Increment request count
        userRequest!.count += 1;
      } else {
        // Initialize request count for the user
        requests.set(userId, {
          count: 1,
          lastRequestTime: Date.now()
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({ error: "Unauthorized: Invalid token" });
    }
  };
};

exports.generateQuestions = functions.https.onRequest(async (req: any, res: any) => {
  cors(req, res, async () => {
    try {
      rateLimit(3, 60000)(req, res, async () => {
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
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "OpenAI API call failed" });
    }
  });
});

