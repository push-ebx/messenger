const {Schema, model} = require('mongoose')

const ConversationSchema = new Schema({
  id: {type: Number, unique: true, required: true},
  first_id: {type: Number, required: true},
  second_id: {type: Number, required: true},
})

module.exports = model('Conversation', ConversationSchema)