const nodemailer = require('nodemailer');

async function pushNotification(to, data) {
    const message = { to, sound: 'default', ...data };
    console.log("SENDING: ", message)
  try {
    fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-encoding': 'gzip, deflate',
            Host: 'exp.host',
        },
        body: JSON.stringify(message),
    });
  } catch (error) {
    console.error("ERR pushNotification", message, error)
  }
}
// Route Open
module.exports = pushNotification;
