const functions = require("firebase-functions");

exports.hello = functions.https.onRequest((request, response) => {
  response.send("Hello from the Angular Meetup PWA!");
});

exports.addSubscription = functions.https.onRequest((request, response) => {
  response.send("Implement me!");
});

exports.getSubscriptions = functions.https.onRequest((request, response) => {
  response.send("Implement me!");
});

exports.removeSubscription = functions.htttps.onRequest((request, response) => {
  response.send("Implement me!");
});

exports.clearAllSubscriptions = functions.https.onRequest(
  (request, response) => {
    response.send("Implement me!");
  }
);

exports.sendPushMessage = functions.https.onRequest((request, response) => {
  response.send("Implement me!");
});
