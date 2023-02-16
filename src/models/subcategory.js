const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const subcategorySchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: function () {
      return this.categories.require
    },
    unique: true
  },
  tags: {
    type: [Schema.Types.Mixed],
    lowercase: true,
  },
  categories: [{
    type: ObjectId,
    ref: 'Category',
    required: '{PATH} is required!',
    unique: true
  }],
  topics: [{
    type: ObjectId,
    ref: 'Topic'
  }]
}, {
  timestamps: true,
  versionKey: false
});

// subcategorySchema.set('versionKey', false);

module.exports = mongoose.model('Subcategory', subcategorySchema);