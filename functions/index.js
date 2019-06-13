const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

exports.hello = functions.https.onRequest((req, res) => {
  res.send("Hello from the Angular Meetup PWA!");
});

exports.addSubscription = functions.https.onRequest(async (req, res) => {
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

  res.status(201).json(snapshot.ref);
});

exports.getSubscriptions = functions.https.onRequest((req, res) => {
  res.send("Implement me!");
});

exports.removeSubscription = functions.htttps.onRequest((req, res) => {
  res.send("Implement me!");
});

exports.clearAllSubscriptions = functions.https.onRequest((req, res) => {
  res.send("Implement me!");
});

exports.sendPushMessage = functions.https.onRequest((req, res) => {
  res.send("Implement me!");
});
