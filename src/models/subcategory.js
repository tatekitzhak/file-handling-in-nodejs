const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const subcategorySchema = new Schema({
  name: {
    type: String,

  },
}, {
  timestamps: true,
  // versionKey: false
});

subcategorySchema.set('versionKey', false);

module.exports = mongoose.model('Subcategory', subcategorySchema);