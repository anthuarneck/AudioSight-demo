/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require("firebase-functions");
const querystring = require("querystring");

exports.login = functions.https.onRequest((req, res) => {
  const scope = "user-read-private user-read-email";
  const clientId = "8b34a109eb1244189620da8eba0cafd";
  const redirectUri = "https://audiosightdemo.netlify.app/success";

  // Redirect to Spotify authorization URL
  const spotifyAuthUrl = "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      clientId,
      scope,
      redirectUri,
    });
  res.redirect(spotifyAuthUrl);
});
