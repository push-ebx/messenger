const jwt = require('jsonwebtoken')
const {secret} = require("../config")

module.exports = function (req, res, next){
  if (req.method === "OPTIONS"){
    next()
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
      return res.status(483).json({message: "User has been not authorized"})
    }
    req.user_id = jwt.verify(token, secret)
    next()
  } catch (e) {
    console.log(e)
    return res.status(483).json({message: "User has been not authorized"})
  }
}