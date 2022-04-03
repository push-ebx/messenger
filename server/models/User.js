const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
  id: {type: Number, unique: true, required: true},
  username: {type: String, unique: true, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  password: {type: String, required: true},
  sex: {type: Number, required: true, enum: [1, 2]},
  is_online: {type: Boolean},
  last_seen: {type: String}
})

module.exports = model('User', UserSchema)