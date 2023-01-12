const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const contentSchema = mongoose.Schema({
    name: {
        type: String,
        required: '{PATH} is required!',
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    tags: {
        type: Array,
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: "A content should have at least one tag.",
        }
    },
    isPublished: Boolean,
    content: {
        type: String,
        minlength: 0,
        maxlength: 9999,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);