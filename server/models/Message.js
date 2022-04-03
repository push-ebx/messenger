const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  conversationId: {type: Number, required: true},
  from: {type: Number, required: true},
  to: {type: Number, required: true},
  text: {type: String, required: true}
}, { versionKey: false });

module.exports = mongoose.model("Message", MessageSchema);