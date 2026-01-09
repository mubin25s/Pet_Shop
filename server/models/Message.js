const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true }, // Usually the User's ID
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who sent it
  text: { type: String, required: true },
  seen: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
