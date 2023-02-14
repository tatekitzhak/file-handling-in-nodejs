const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const categorySchema = new Schema({
  name: String,
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