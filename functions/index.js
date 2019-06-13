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

exports.clearAllSubscriptions = functions.https.onRequest(async (req, res) => {
  const snapshot = await admin
    .database()
    .ref("/subscriptions")
    .remove();

  return res.status(204).send();
});

exports.sendPushMessage = functions.https.onRequest((req, res) => {
  res.send("Implement me!");
});
