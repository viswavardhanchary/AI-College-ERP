const PersonalChat = require('../models/personalchat.models');

exports.createChatSession = async (req, res) => {
    try {
        const chat = await PersonalChat.create(req.body);
        res.status(201).json(chat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllChats = async (req, res) => {
    try {
        const chats = await PersonalChat.find()
            .populate('user_id college chat_history.my_chat.uploads chat_history.other_chat.uploads');
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getChatById = async (req, res) => {
    try {
        const chat = await PersonalChat.findById(req.params.id)
            .populate('user_id college chat_history.my_chat.uploads chat_history.other_chat.uploads');
        if (!chat) return res.status(404).json({ message: "Chat not found" });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getChatsByUser = async (req, res) => {
    try {
        const chats = await PersonalChat.find({ user_id: req.params.userId })
            .populate('college');
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addChatMessage = async (req, res) => {
    try {
        const chat = await PersonalChat.findByIdAndUpdate(
            req.params.id,
            { $push: { chat_history: req.body } },
            { new: true, runValidators: true }
        );
        res.status(200).json(chat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateChatMessage = async (req, res) => {
    try {
        const chat = await PersonalChat.findOneAndUpdate(
            { _id: req.params.id, "chat_history._id": req.params.messageId },
            { $set: { "chat_history.$": req.body } },
            { new: true }
        );
        res.status(200).json(chat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteChatMessage = async (req, res) => {
    try {
        const chat = await PersonalChat.findByIdAndUpdate(
            req.params.id,
            { $pull: { chat_history: { _id: req.params.messageId } } },
            { new: true }
        );
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteChatSession = async (req, res) => {
    try {
        await PersonalChat.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Chat session deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};