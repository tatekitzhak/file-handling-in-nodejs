const mongoose = require('mongoose');

/**
 * @class Person
 */
const personSchema = new mongoose.Schema({
  name : {
    type     : String,
    trim     : true,
    required : true,
  },
  // profile as sub document
  profile : new mongoose.Schema({
    city : String,
    age  : {
      type    : Number,
      default : 0
    },
  }),
  // others as nested document
  others : {
    amount : {
      type    : Number,
      default : 0
    },
    email : {
      type : String,
      trim : true,
    },
  },
  // array of names as nested document
  friends : [
    { name: String }
  ],
  // array of hobbies as sub document
  hobbies : [
    new mongoose.Schema({ name: 'string' })
  ]
});

module.exports = mongoose.model('Person', personSchema);

