const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const topicSchema = mongoose.Schema({
    name: {
        type: String,
        required: '{PATH} is required!',
        minlength: 0,
        maxlength: 9999,
        unique: true
    },
    author: {
        type: String
    },
    title: {
        type: String
    },
    video: {
        url: {
            type: String,
            trim: true,
        }
    },
    views: {
        type: Number,
        trim: true,
    },
    subscribers: {
        type: Number
    },
    tags: {
        type: [Schema.Types.Mixed],
        lowercase: true,
        validate: {
          validator: function (value) {
            return value.length > 0
          },
          message: `A ${this.name} should have at least one tag.`,
        },
      },
    isPublished: Boolean,
    subcategorie: {
        type: ObjectId,
        ref: 'Subcategorie',
        required: '{PATH} is required!',
        unique: true
    },
    article: {
        type: ObjectId,
        ref: 'Article'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Topic', topicSchema);