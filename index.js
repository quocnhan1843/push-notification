const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'app')));

const publicVapiKey =
  'BDSkCg6r_bbwLgOdwplEPdL_YPSzWP3_v3gsi40gGDb7BTTTLGpGkHDBPzTdkIuhIPX-RdKGsWgM1AbJJ2n6INA';
const privateVapiKey = 'MRLzqHw7upRUprwpOWqs5bH2JJJFIK7UYXEHnjLsjxk';

webPush.setVapidDetails(
  'mailto:quocnhan1843@gmail.com',
  publicVapiKey,
  privateVapiKey
);

// Subscribe Route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const bodyRequest = req.body;
  const subscription = JSON.parse(bodyRequest.subscription);
  const payload = JSON.parse(bodyRequest.payload);

  res.status(201).json({});

  // Pass object into senNotification
  webPush
    .sendNotification(subscription, payload)
    .catch(err => console.error('Error', err));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
