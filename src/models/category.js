const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const categorySchema = new Schema({
  name: {
    type: String,
    required: '{PATH} is required!',
    minlength: 3,
    maxlength: 255,
    unique: true,
    uppercase: true
  },
  tags: {
    type: [Schema.Types.Mixed],
    lowercase: true,
  },
  subcategories: [{
    type: ObjectId,
    ref: 'Subcategory',
    unique: true
  }]
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Category', categorySchema);