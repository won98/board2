// const jwt = require("../utils/jwts");

// const authUtil = {
//   checkToken: async (req, res, next) => {
//     var token = req.headers.token;
//     // 토큰 없음
//     if (!token) return res.json(util.fail(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN));
//     // decode
//     const user = await jwt.verify(token);
//     // 유효기간 만료
//     if (user === TOKEN_EXPIRED)
//       return res.json(util.fail(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
//     // 유효하지 않는 토큰
//     if (user === TOKEN_INVALID)
//       return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
//     if (user.idx === undefined)
//       return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
//     req.idx = user.idx;
//     next();
//   },
// };

// module.exports = authUtil;
