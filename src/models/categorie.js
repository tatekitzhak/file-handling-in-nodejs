const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const categorieSchema = new Schema({
  name: {
    type: String,
    required: '{PATH} is required!',
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  tags: [Schema.Types.Mixed],
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