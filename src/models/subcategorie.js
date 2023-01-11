const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const subCategorieSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: function () {
      return this.categories.require
    },
    unique: true
  },
  tags: [String, String],
  isPublished: Boolean,
  categories: [{
    type: ObjectId,
    ref: 'Categorie',
    required: '{PATH} is required!',
    unique: true
  }],
  topics: [{
    type: ObjectId,
    ref: 'Topic'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Subcategorie', subCategorieSchema);