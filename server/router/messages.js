const MessageSchema = require('../models/Message')
const ConversationSchema = require('../models/Conversation')

class Messages {
  // POST body:{receiver_id, text},
  async send(req, res) {
    try {
      const sender_id = req.user_id
      const {receiver_id, text} = req.body
      const conversation = await getConversation(sender_id, receiver_id) ?? await saveConversation(receiver_id, sender_id);
      const count = await MessageSchema.countDocuments({conversationId: conversation.id})
      const new_message = new MessageSchema({
        id: count + 1,
        conversationId: conversation.id,
        sender_id,
        receiver_id,
        text
      })
      new_message.save().then(() => console.log("Message sent successfully"))
      return res.status(200).json({mes: "Message sent successfully"})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Error. The message was not sent'})
    }
  }

  // POST body:{second_id},
  async createConversation(req, res) { // валидация, проверить существует ли id_companion
    try {
      const {second_id} = req.body
      const first_id = req.user_id
      console.log(first_id, second_id)
      const conversation = await getConversation(first_id, second_id);
      if (conversation) {
        return res.status(200).json({
          error: {
            code: 422,
            error_message: "The conversation has already been created"
          }
        })
      }
      saveConversation(first_id, second_id)
      return res.status(200).json({message: `Conversation successfully registered`})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Error create conversation'})
    }
  }

  // GET query: req.user_id of token; return: list of conversations
  async getConversations(req, res) {
    try {
      const user_id = req.user_id
      const conversations = await ConversationSchema.find({$or: [{first_id: user_id}, {second_id: user_id}]})
      return res.status(200).json(conversations)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Error get conversations'})
    }
  }

  // GET query: companion_id; return: conversation
  async getConversationById(req, res) {
    try {
      const user_id = req.user_id
      const {companion_id} = req.query
      const conversation = await getConversation(user_id, companion_id)////беседы может не быть
      const messages = await MessageSchema.find({conversationId: conversation.id})
      return res.status(200).json(messages)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Error. The message was not sent'})
    }
  }
}

const saveConversation = async (first_id, second_id) => {
  const count = await ConversationSchema.countDocuments();
  const new_conversation = new ConversationSchema({
    id: count + 1, first_id, second_id
  });
  new_conversation.save().then(() => console.log(`Conversation successfully registered with id: ${count + 1}`));
  return new_conversation
}

const getConversation = async (first_id, second_id) => {
  return await ConversationSchema.findOne({first_id, second_id}) ?? await ConversationSchema.findOne({
    first_id: second_id, second_id: first_id
  })
}

module.exports = new Messages();