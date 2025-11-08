const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;
const app = express();
// const OAuthServer = require('@node-oauth/express-oauth-server');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:8080',
  clientID: 'BNfFKb6xZaDrRHSTVUCOZC0I4UIoSBwB',
  issuerBaseURL: 'https://dev-vqss20leurm1q62n.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', requiresAuth(), (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});



app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

  process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// app.oauth = new OAuthServer({
//   model: require('./oauthModel'),  // you'll implement this
//   accessTokenLifetime: 60 * 60,
//   allowBearerTokensInQueryString: true
// });

// // Token endpoint for clients to get an access token
// app.post('/oauth/token', app.oauth.token());

// // Protect all your API routes with:
// app.use('/api', app.oauth.authenticate(), require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});