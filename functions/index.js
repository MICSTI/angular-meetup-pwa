const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// set up body parser
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

const fetchSubscriptions = async () => {
  return await admin
    .database()
    .ref("/subscriptions")
    .once("value");
};

const fetchRandomSubscription = async () => {
  const subscriptions = await fetchSubscriptions();

  if (subscriptions.length <= 0) {
    return null;
  }

  const randIdx = Math.floor(Math.random() * subscriptions.length);
  return subscriptions[randIdx];
};

const sendSinglePushMessage = async (token, data) => {
  const message = {
    data,
    token
  };

  try {
    return await admin.messaging().send(message);
  } catch (err) {
    throw err;
  }
};

app.get("/hello", (req, res) => {
  res.send("Hello from the Angular Meetup PWA!");
});

app.post("/addSubscription", async (req, res) => {
  if (req.get("content-type") !== "application/json") {
    return res.status(400).json({
      message: "Only Content-Type application/json is supported"
    });
  }

  const data = req.body.data;

  if (!data) {
    return res.status(400).json({
      message: "Missing body data"
    });
  }

  const snapshot = await admin
    .database()
    .ref("/subscriptions")
    .push(data);

  return res.status(201).send();
});

app.get("/getSubscriptions", async (req, res) => {
  const subscriptions = await fetchSubscriptions();

  return res.status(200).json(subscriptions);
});

app.post("/removeSubscription", (req, res) => {
  res.send("Implement me!");
});

app.post("/clearAllSubscriptions", async (req, res) => {
  const snapshot = await admin
    .database()
    .ref("/subscriptions")
    .remove();

  return res.status(204).send();
});

app.post("/sendPushMessage", async (req, res) => {
  if (req.get("content-type") !== "application/json") {
    return res.status(400).json({
      message: "Only Content-Type application/json is supported"
    });
  }

  const token = req.body.data.token;

  try {
    await sendSinglePushMessage(token, {
      title: "Hi there!",
      message: "Hello!!!"
    });

    return res.status(200).send();
  } catch (ex) {
    return res.status(400).json({
      message: ex.message
    });
  }
});

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
