const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const subCategorieSchema = new Schema({
  name: {
    type: String,
    minlength: 5,
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
  timestamps: true,
  // versionKey: false
});

subCategorieSchema.set('versionKey', false);

module.exports = mongoose.model('Subcategorie', subCategorieSchema);