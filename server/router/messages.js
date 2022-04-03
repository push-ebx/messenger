const MessageSchema = require('../models/Message')

class Messages {
  async test(req, res) {
    const mes = new MessageSchema({
      id: 1,
      conversationId: 1,
      from: 1,
      to: 2,
      text: "test"
    });
    mes.save().then(() => console.log('mes created'));
    res.status(200).json({message: 'mes was create'});
  }

  async send(req, res) {

  }

  async getConversations(req, res) {

  }

  async getConversationById(req, res) {

  }
}

module.exports = new Messages();