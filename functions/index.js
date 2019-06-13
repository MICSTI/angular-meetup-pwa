const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

const fetchSubscriptions = async () => {
  return await admin
    .database()
    .ref("/subscriptions")
    .once("value");
};

exports.hello = functions.https.onRequest((req, res) => {
  res.send("Hello from the Angular Meetup PWA!");
});

exports.addSubscription = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "No handler for request method " + req.method
    });
  }

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

exports.getSubscriptions = functions.https.onRequest(async (req, res) => {
  const subscriptions = await fetchSubscriptions();

  return res.status(200).json(subscriptions);
});

exports.removeSubscription = functions.https.onRequest((req, res) => {
  res.send("Implement me!");
});

exports.clearAllSubscriptions = functions.https.onRequest((req, res) => {
  res.send("Implement me!");
});

exports.sendPushMessage = functions.https.onRequest((req, res) => {
  res.send("Implement me!");
});
