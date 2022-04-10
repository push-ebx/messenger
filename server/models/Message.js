const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  id: {type: Number, unique: true, required: true},
  conversationId: {type: Number, required: true},
  sender_id: {type: Number, required: true},
  receiver_id: {type: Number, required: true},
  text: {type: String, required: true}
}, { versionKey: false });

module.exports = mongoose.model("Message", MessageSchema);