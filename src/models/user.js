/*
* @Schema Properties:
* name
* email
* password
* age
* phone
*
* Author: punitkumaryh
*/
const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
//// Creating user model with schema 
//#region User-Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Cannot have as password as 'password'");
            }
        },
    },
    age: {
        type: Number,
        default: 0,
        // custom validator
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be positive Number");
            }
        }
    }, // shorthand for 'age: {type:Number}'
    phone: {
        type: String,
        trim: true,
        // Validator Library
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error("Invalid phone number");
            }
        },
    }
}, {
    timestamps: true
});

// Pre save Middleware
userSchema.pre("save", async function (next) {
    const user = this;
    // "this" -> is current input each user about to save
    console.log("Just before saving!");
    next()
});

module.exports = mongoose.model("User", userSchema); //#endregion
