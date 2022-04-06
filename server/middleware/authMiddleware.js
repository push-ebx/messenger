const jwt = require('jsonwebtoken')
require('dotenv').config({path: "../.env"});

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(200).json({
        error: {
          code: 401,
          error_message: "User has been not authorized"
        }
      })
    }
    req.user_id = jwt.verify(token, process.env.SECRET).id
    next()
  } catch (e) {
    console.log(e)
    return res.status(200).json({
      error: {
        code: 401,
        error_message: "User has been not authorized"
      }
    })
  }
}