// const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId; 

// module.exports = {
//   async getClient(clientId, clientSecret) {
//     const db = mongodb.getDb().db(sariah3tanner);
//     const client = await db.collection('oauth_clients')
//       .findOne({ clientId, clientSecret });
//     if (!client) return null;

//     return {
//       id: client._id,
//       clientId: client.clientId,
//       clientSecret: client.clientSecret,
//       grants: client.grants,            
//       redirectUris: client.redirectUris  
//     };
//   },

//   async getUser(username, password) {
//     const db = mongodb.getDb().db(sariah3tanner);
//     const user = await db.collection('users')
//       .findOne({ username, password});
//     if (!user) return null;
//     return { id: user._id, username: user.username };
//   },

//   async saveToken(token, client, user) {
//     const db = mongodb.getDb().db(sariah3tanner);
//     const tokenDocument = {
//       accessToken: token.accessToken,
//       accessTokenExpiresAt: token.accessTokenExpiresAt,
//       refreshToken: token.refreshToken,
//       refreshTokenExpiresAt: token.refreshTokenExpiresAt,
//       client: { id: client.id },
//       user: { id: user.id }
//     };
//     await db.collection('oauth_tokens').insertOne(tokenDocument);
//     return {
//       accessToken: token.accessToken,
//       accessTokenExpiresAt: token.accessTokenExpiresAt,
//       refreshToken: token.refreshToken,
//       refreshTokenExpiresAt: token.refreshTokenExpiresAt,
//       client: { id: client.id },
//       user: { id: user.id }
//     };
//   },

//   async getAccessToken(accessToken) {
//     const db = mongodb.getDb().db(sariah3tanner);
//     const tok = await db.collection('oauth_tokens')
//       .findOne({ accessToken });
//     if (!tok) return null;
//     return {
//       accessToken: tok.accessToken,
//       accessTokenExpiresAt: tok.accessTokenExpiresAt,
//       client: { id: tok.client.id },
//       user: { id: tok.user.id }
//     };
//   },

//   async getRefreshToken(refreshToken) {
//     const db = mongodb.getDb().db(sariah3tanner);
//     const tok = await db.collection('oauth_tokens')
//       .findOne({ refreshToken });
//     if (!tok) return null;
//     return {
//       refreshToken: tok.refreshToken,
//       refreshTokenExpiresAt: tok.refreshTokenExpiresAt,
//       client: { id: tok.client.id },
//       user: { id: tok.user.id }
//     };
//   },

//   async revokeToken(token) {
//     const db = mongodb.getDb().db(sariah3tanner);
//     const result = await db.collection('oauth_tokens')
//       .deleteOne({ refreshToken: token.refreshToken });
//     return result.deletedCount > 0;
//   },

//   async saveAuthorizationCode(code, client, user) {
//     const db = mongodb.getDb().db(sariah3tanner);
//     const codeDoc = {
//       authorizationCode: code.authorizationCode,
//       expiresAt: code.expiresAt,
//       redirectUri: code.redirectUri,
//       client: { id: client.id },
//       user: { id: user.id }
//     };
//     await db.collection('oauth_codes').insertOne(codeDoc);
//     return Object.assign({}, code, { client, user });
//   },

//   async getAuthorizationCode(authorizationCode) {
//     const db = mongodb.getDb().db(sariah3tanner);
//     const code = await db.collection('oauth_codes')
//       .findOne({ authorizationCode });
//     if (!code) return null;
//     return {
//       code: code.authorizationCode,
//       expiresAt: code.expiresAt,
//       redirectUri: code.redirectUri,
//       client: { id: code.client.id },
//       user: { id: code.user.id }
//     };
//   },

//   async revokeAuthorizationCode(code) {
//     const db = mongodb.getDb().db(sariah3tanner);
//     const result = await db.collection('oauth_codes')
//       .deleteOne({ authorizationCode: code.authorizationCode });
//     return result.deletedCount > 0;
//   },

  
//   async verifyScope(token, scope) {
//     return true;
//   }
// };
