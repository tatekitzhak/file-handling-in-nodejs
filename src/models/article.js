const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const articleSchema = mongoose.Schema({
    name: {
        type: String,
        required: '{PATH} is required!',
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    tags: [String, String],
    isPublished: Boolean,
    topic: {
        type: ObjectId, ref: 'Topic',
        required: '{PATH} is required!',
        unique: true
    },
    content: {
        type: String
    },
    abstract: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);