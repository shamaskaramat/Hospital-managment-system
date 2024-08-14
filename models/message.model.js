import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    message: { type: String, required: true },
    email: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    sentAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
