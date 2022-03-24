const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;




app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});
app.use(express.json());
app.use(express.static(__dirname + '/../build'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


function tokenGenerator(userName, room) {
  const twilioAccountSid = "AC30fb3c13e919c18853b08b9475cbf934";
  const twilioApiKey = "SK9271a3c3d02378bd1b2b63c1254746a1";
  const twilioApiSecret = "BxMUknqgQVV2Z1dTIjRxhH9PNuoykxfC";

  const identity = userName;

  const videoGrant = new VideoGrant({
    room: room,
  });
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    {identity: identity}
  );
  token.addGrant(videoGrant);
  return token.toJwt()
}



app.post("/token", (req, res) => {
  const asynch = async () => {
  const userName = req.body.userName;
  const room = req.body.room;
  const token = await tokenGenerator(userName, room);
  // console.log('token', token)
  console.log('typeof token', typeof token)
  res.json(token);
  }
  asynch()
})