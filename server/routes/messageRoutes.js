const express = require('express');
const router = express.Router();
const { getMessages, getConversations } = require('../controllers/messageController');
const { auth } = require('../middleware/authMiddleware');

router.get('/:conversationId', auth, getMessages);
router.get('/admin/conversations', auth, getConversations);

module.exports = router;
