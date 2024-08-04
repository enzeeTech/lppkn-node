const { forEach } = require('lodash');
const m = require('../models');

const sendPushNotification = require('../services/pushNoti');

async function store(req, res) {
    const { token } = req.body;
    console.log("IN: ", token)
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    const [newTOken, tokenCreated] = await m.ExpoToken.findOrCreate({
        where: { token },
        defaults: { token },
      });
    res.json({ message: tokenCreated ? "token saved": "token existed", newTOken });
}

const notificationWebHook = async (req, res) => {
    console.log(req.body);

    // Log the received notification payload
    console.log('Received notification payload:');
    if (!req.body.entry) {
        return res.status(400).json({ message: "missing required parameters 'entry' in body" });
    }

    // Check if the model starts with 'lokasi'
    if (req.body.model && req.body.model.startsWith('lokasi')) {
        console.log('Request from model starting with "lokasi", not triggering notification');
        return res.status(200).send('No action taken for model starting with "lokasi"');
    }

    const { Title: title, Information: body } = req.body.entry;
    const notificationPayload = { title, body, data: { data: 'goes here' }};

    // Send a push notification to the Expo app
    const tokens = (await m.ExpoToken.findAll({ raw: true })).map(t => t.token);
    tokens.forEach(token => sendPushNotification(token, notificationPayload));

    // Check if the request is coming from ngrok
    if (req.headers.host === 'localhost:4040') {
        console.log('Request from ngrok, not sending response');
        return res.end();
    }

    // Send a success response
    res.status(200).send('Notification payload received');
};


module.exports = { store, notificationWebHook };
