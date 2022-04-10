const UserSchema = require('../models/User')

class Users {
  async getById(req, res) {
    try {
      if (!/^\d+$/.test(req.query.id) && req.query.id) {
        return res.status(200).json({
          error: {
            code: 422,
            error_message: "Incorrect ID"
          }
        })
      }
      const user = (await UserSchema.findOne({id: !req.query.id ? req.user_id : req.query.id}))?.toObject()

      if (user) {
        delete user.password;
        delete user._id;
        delete user.__v;
        return res.status(200).json(user)
      }
      return res.status(200).json({
        error: {
          code: 404,
          error_message: "User with such ID not found"
        }
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'An unforeseen error occurred'})
    }
  }

  async getByUsername(req, res) {
    try {
      const username = req.query.username
      if (username.length < 1 || username.length > 15) {
        return res.status(200).json({
          error: {
            code: 422,
            error_message: "The username should be out of 1-15 symbols"
          }
        })
      }
      const user = (await UserSchema.findOne({username}))?.toObject()
      if (user) {
        delete user.password;
        delete user._id;
        delete user.__v;
        return res.status(200).json(user)
      }
      return res.status(400).json({
        error: {
          code: 400,
          error_message: "User with such ID not found"
        }
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'An unforeseen error occurred'})
    }
  }

  async getIdByToken(req, res) {
    try {
      console.log(req)
      return res.status(200).json({id: req.user_id})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'An unforeseen error occurred'})
    }
  }
}

module.exports = new Users();