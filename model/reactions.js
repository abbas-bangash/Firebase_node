const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    reaction: {
        type: String,
        enum: ['like', 'love', 'funny', 'wow', 'sad', 'angry'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});


module.exports = mongoose.model('Reaction', ReactionSchema);