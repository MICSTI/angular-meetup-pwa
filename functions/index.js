const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// set up body parser
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const getRandomSubscription = async () => {
  const subscriptions = await getAllSubscriptions();

  if (subscriptions.length <= 0) {
    return null;
  }

  const randIdx = Math.floor(Math.random() * subscriptions.length);
  return subscriptions[randIdx];
};

const getAllSubscriptions = async () => {
  const subscriptions = [];

  const snapshot = await admin
    .database()
    .ref('/subscriptions')
    .orderByKey()
    .once('value');

  snapshot.forEach((childSnapshot) => {
    const value = childSnapshot.val();

    subscriptions.push({
      token: value.token,
      name: value.name,
    });
  });

  return subscriptions;
};

const broadcastMessage = async (messageData, excludedTokens = []) => {
  const enabled = await broadcastEnabled();

  if (!enabled) {
    return false;
  }

  const subscriptions = await getAllSubscriptions();

  const filteredSubscriptions = subscriptions.filter(
    (subscription) => {
      return !excludedTokens.includes(subscription.token);
    }
  );

  filteredSubscriptions.forEach(subscription => {
    await sendSinglePushMessage(subscription.token, messageData);
  });

  return true;
};

const getSubscriptionToToken = async (token) => {
  let subscription = null;

  const snapshot = await admin
    .database()
    .ref('/subscriptions')
    .orderByKey()
    .once('value');

  snapshot.forEach((childSnapshot) => {
    const value = childSnapshot.val();

    if (value.token === token) {
      subscription = value;
    }
  });

  return subscription;
};

const tokenExists = async (token) => {
  const subscription = await getSubscriptionToToken(token);

  return subscription !== null;
};

const sendSinglePushMessage = async (token, data) => {
  const message = {
    token,
    notification: {
      title: data.title,
    },
    webpush: {
      headers: {
        Urgency: 'high',
      },
      notification: {
        body: data.body,
        requireInteraction: 'true',
      },
    },
  };

  try {
    return await admin.messaging().send(message);
  } catch (err) {
    throw err;
  }
};

const broadcastEnabled = async () => {
  const snapshot = await admin
    .database()
    .ref('/broadcast')
    .orderByKey()
    .once('value');

  return snapshot.length > 0;
};

const activateBroadcast = async () => {
  const alreadyEnabled = await broadcastEnabled();

  if (alreadyEnabled) {
    return true;
  }

  const data = {
    active: true,
  };

  const snapshot = await admin
    .database()
    .ref('/broadcast')
    .push(data);

  return true;
};

const deactivateBroadcast = async () => {
  const snapshot = await admin
    .database()
    .ref('/broadcast')
    .remove();

  return true;
};

app.get('/hello', (req, res) => {
  res.send('Hello from the Angular Meetup PWA!');
});

app.post('/addSubscription', async (req, res) => {
  if (req.get('content-type') !== 'application/json') {
    return res.status(400).json({
      message: 'Only Content-Type application/json is supported',
    });
  }

  const data = req.body.data;

  if (!data) {
    return res.status(400).json({
      message: 'Missing body data',
    });
  }

  const tokenAlreadyExists = await tokenExists(data.token);

  if (tokenAlreadyExists) {
    return res.status(204).send();
  }

  const snapshot = await admin
    .database()
    .ref('/subscriptions')
    .push(data);

  return res.status(201).send();
});

app.get('/getSubscriptions', async (req, res) => {
  const subscriptions = await getAllSubscriptions();

  return res.status(200).json(subscriptions);
});

app.get('/getRandom', async (req, res) => {
  const randomSubscription = await getRandomSubscription();

  return res.status(200).json(randomSubscription);
});

app.post('/removeSubscription', (req, res) => {
  res.send('Implement me!');
});

app.delete('/clearAllSubscriptions', async (req, res) => {
  const snapshot = await admin
    .database()
    .ref('/subscriptions')
    .remove();

  return res.status(204).send();
});

app.post('/sendPushMessage', async (req, res) => {
  if (req.get('content-type') !== 'application/json') {
    return res.status(400).json({
      message: 'Only Content-Type application/json is supported',
    });
  }

  const { token, title, body } = req.body.data;

  const subscription = await getSubscriptionToToken(token);

  if (!subscription) {
    return res
      .status(400)
      .json({ message: 'No matching token found' });
  }

  try {
    await sendSinglePushMessage(token, {
      title,
      body,
    });

    return res.status(204).send();
  } catch (ex) {
    return res.status(400).json({
      message: ex.message,
    });
  }
});

app.post('/enableBroadcast', async (req, res) => {
  const status = await activateBroadcast();

  return res.status(200).json({
    status,
  });
});

app.post('/disableBroadcast', async (req, res) => {
  const status = await deactivateBroadcast();

  return res.status(200).json({
    status,
  });
});

app.post('/broadcastMessage', async (req, res) => {
  if (req.get('content-type') !== 'application/json') {
    return res.status(400).json({
      message: 'Only Content-Type application/json is supported',
    });
  }

  const { senderToken, title, body } = req.body.data;

  try {
    await broadcastMessage({
      title,
      body,
    }, [senderToken]);

    return res.status(204).send();
  } catch (ex) {
    return res.status(400).json({
      message: ex.message,
    });
  }
});

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
