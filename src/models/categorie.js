const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const categorieSchema = mongoose.Schema({
  name: {
    type: String,
    required: '{PATH} is required!',
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  tags: [String, String],
  isPublished: Boolean,
  subcategories: [{
    type: ObjectId,
    ref: 'Subcategorie',
    unique: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Categorie', categorieSchema);