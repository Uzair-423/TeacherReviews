const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    professorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor'
    },
    body: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

Comment = new mongoose.model('Comment', CommentSchema);

module.exports = Comment;