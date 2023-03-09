const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    description: {
        type: String,
        required: [true, 'Please add description'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    reaction: Array({
        type: Object,
        ref: 'Reactions',

    }),
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});


module.exports = mongoose.model('Post', PostSchema);