const AIChat = require('../models/aichat.models');


exports.createChatSession = async (req, res) => {
    try {
        const newSession = await AIChat.create(req.body);
        res.status(201).json(newSession);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await AIChat.find()
            .populate('user_id college');
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserSessions = async (req, res) => {
    try {
        const sessions = await AIChat.find({ user_id: req.params.userId })
            .sort({ createdAt: -1 });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addMessageToChat = async (req, res) => {
    try {
        const { user_question, ai_response, ai_response_json_data, ai_response_query, extra_message } = req.body;
        
        const newMessage = {
            user_question,
            ai_response,
            ai_response_json_data,
            ai_response_query,
            extra_message,
            date_time: new Date()
        };

        const updatedChat = await AIChat.findByIdAndUpdate(
            req.params.id,
            { $push: { chat: newMessage } },
            { new: true, runValidators: true }
        );

        if (!updatedChat) return res.status(404).json({ message: "Session not found" });
        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSession = async (req, res) => {
    try {
        await AIChat.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Chat session deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};