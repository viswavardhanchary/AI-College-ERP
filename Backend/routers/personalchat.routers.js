const express = require('express');
const router = express.Router();
const personalchatsControllers = require('../controllers/personalchat.controllers');

router.post('/', personalchatsControllers.createChatSession);
router.get('/', personalchatsControllers.getAllChats);
router.get('/:id', personalchatsControllers.getChatById);
router.get('/user/:userId', personalchatsControllers.getChatsByUser);
router.delete('/:id', personalchatsControllers.deleteChatSession);

router.post('/:id/messages', personalchatsControllers.addChatMessage);
router.put('/:id/messages/:messageId', personalchatsControllers.updateChatMessage);
router.delete('/:id/messages/:messageId', personalchatsControllers.deleteChatMessage);

module.exports = router;