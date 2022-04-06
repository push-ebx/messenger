const {validationResult} = require("express-validator");
const UserSchema = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require('dotenv').config({path: "../.env"});

const generateAccessToken = (id) => {
  const payload = {
    id
  }
  return jwt.sign(payload, process.env.SECRET, {expiresIn: "24h"})
}

class Auth {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({
          error: {
            code: 422,
            error_message: "The user has already been created"
          }
        })
      }
      const {username, password, first_name, last_name, sex} = req.body
      const candidate = await UserSchema.findOne({username})
      if (candidate) {
        return res.status(200).json({
          error: {
            code: 422,
            error_message: "The user has already been created"
          }
        })
      }

      const count = await UserSchema.countDocuments();
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = new UserSchema({
        id: count + 1,
        username,
        password: hashPassword,
        first_name,
        last_name,
        sex
      });
      user.save().then(() => console.log(`User successfully registered with id: ${count + 1}`));
      res.status(200).json({message: `User successfully registered with id: ${count + 1}`})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Registration error'})
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body
      const user = await UserSchema.findOne({username})
      if (!user) {
        return res.status(200).json({
          error: {
            code: 404,
            error_message: "User not found"
          }
        })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(200).json({
          error: {
            code: 400,
            error_message: "Entered invalid password"
          }
        })
      }
      const token = generateAccessToken(user.id)
      return res.json({
        token,
        user_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        sex: user.sex
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Login error'})
    }
  }
}

module.exports = new Auth();