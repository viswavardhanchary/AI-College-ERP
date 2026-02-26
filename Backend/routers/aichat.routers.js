const express = require('express');
const router = express.Router();
const aiChatController = require('../controllers/aichat.controllers');


router.post('/session', aiChatController.createChatSession);
router.get('/sessions', aiChatController.getAllSessions);
router.get('/user/:userId', aiChatController.getUserSessions);
router.delete('/session/:id', aiChatController.deleteSession);


router.post('/session/:id/message', aiChatController.addMessageToChat);

module.exports = router;