const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const categorieSchema = new Schema({
  name: {
    type: String,
    // required: '{PATH} is required!',
    minlength: 3,
    maxlength: 255,
    unique: true,
    uppercase: true
  },
  tags: {
    type: [Schema.Types.Mixed],
    lowercase: true,
  },
  isPublished: Boolean,
  subcategories: [{
    type: ObjectId,
    ref: 'Subcategorie',
    unique: true
  }]
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Categorie', categorieSchema);