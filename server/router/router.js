const Router = require('express');
const {check} = require('express-validator')
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware')
const users = require('./users');
const auth = require('./auth');
const messages = require('./messages')

router.get('/users/getById', authMiddleware, users.getById);
router.get('/users/getByUsername', authMiddleware, users.getByUsername);

router.post('/auth/registration', [
  check('username', "The username should be out of 1-15 symbols").isLength({min: 1, max: 15}),
  check('password', "Password should be out of 4-10 symbols").isLength({min: 4, max: 10}),
  check('first_name', "First name should be out of 4-20 symbols").isLength({min: 1, max: 20}),
  check('last_name', "Last name should be out of 4-20 symbols").isLength({min: 1, max: 20}),
  check('sex').custom(value => {
    if (![1, 2].includes(value)) throw new Error("Sex should have value 1 or 2")
    return true
  })
], auth.registration);
router.post('/auth/login', auth.login)

router.post('/messages/send', authMiddleware, messages.send)
router.get('/messages/getConversations', authMiddleware, messages.getConversations)
router.get('/messages/getConversationById', authMiddleware, messages.getConversationById)
module.exports = router;