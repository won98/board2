const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ACCESS_KEY, REFRESH_KEY } = process.env;

const createToken = (user) => {
  //const { id } = req.body;
  const payload = {
    // createToken에 들어갈 payload
    id: user.id,
  };
  const token = jwt.sign(payload, ACCESS_KEY, {
    algorithm: "HS256",
    expiresIn: "1m",
  });
  return token;
};

const creatRefreshToken = (payload) => {
  const retoken = jwt.sign({ id: payload }, REFRESH_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return retoken;
};
// const checkToken = () => {
//   try {
//     // verify를 통해 값 decode!
//     decoded = jwt.verify(token, secretKey);
//   } catch (err) {
//     if (err.message === "jwt expired") {
//       console.log("expired token");
//       return TOKEN_EXPIRED;
//     } else if (err.message === "invalid token") {
//       console.log("invalid token");
//       console.log(TOKEN_INVALID);
//       return TOKEN_INVALID;
//     } else {
//       console.log("invalid token");
//       return TOKEN_INVALID;
//     }
//   }
//   return decoded;
// };

module.exports = { createToken, creatRefreshToken };

// module.exports = {
//   sign: async (user) => {
//     /* 현재는 idx와 email을 payload로 넣었지만 필요한 값을 넣으면 됨! */
//     const payload = {
//       idx: user.userIdx,
//       email: user.email,
//     };
//     const result = {
//       //sign메소드를 통해 access token 발급!
//       token: jwt.sign(payload, secretKey, options),
//       refreshToken: randToken.uid(256),
//     };
//     return result;
//   },
//   verify: async (token) => {
//     let decoded;
//     try {
//       // verify를 통해 값 decode!
//       decoded = jwt.verify(token, secretKey);
//     } catch (err) {
//       if (err.message === "jwt expired") {
//         console.log("expired token");
//         return TOKEN_EXPIRED;
//       } else if (err.message === "invalid token") {
//         console.log("invalid token");
//         console.log(TOKEN_INVALID);
//         return TOKEN_INVALID;
//       } else {
//         console.log("invalid token");
//         return TOKEN_INVALID;
//       }
//     }
//     return decoded;
//   },
// };
