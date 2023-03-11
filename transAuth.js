const request = require('request');
const fs = require('fs');
const path = require('path');

// Sandbox Server address
const url = 'https://sandbox.api.visa.com/cofds-web/v1/datainfo';

// Sample data request: This is the payload that we will send to the Sandbox Server
const payload = {
  "requestHeader": {
    "requestMessageId": "6da6b8b024532a2e0eacb1af58581",
    "messageDateTime": "2019-02-35 05:25:12.327"
  },
  "requestData": {
    "pANs": [
      4072208010000000
    ],
    "group": "STANDARD"
  }
};

// Load configuration data
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath));
const userId = config.user_id;
const password = config.password;
const certPath = path.join(__dirname, config.cert_path);
const keyPath = path.join(__dirname, config.key_path);

const options = {
    url,
    method: 'POST',
    json: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${userId}:${password}`).toString('base64')
    },
    body: payload,
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
    timeout: 10000
};

request(options, (error, response, body) => {
    if (error) {
        console.error(error);
    } else {
        console.log(response.headers);
        console.log(body);
    }
});
