const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getConversations = async (req, res) => {
    // Admin only: get list of users who have messaged
    // Group by conversationId (userId)
    try {
        if(req.userRole !== 'admin') return res.status(403).json({message: "Admin only"});
        
        const conversations = await Message.aggregate([
            { $sort: { createdAt: -1 } },
            { $group: { _id: "$conversationId", lastMessage: { $first: "$$ROOT" } } }
        ]);
        // Ideally populate user info, but conversationId is userId string.
        // We might need to fetch user details separately or look up.
        
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getMessages, getConversations };
