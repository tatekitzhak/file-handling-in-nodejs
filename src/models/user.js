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
    active: { type: Boolean, default: true },
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
    contact: {
        first_name: String,
        last_name: String,
        nick_name: String,
        email: { type: String, required: true, trim: true, lowercase: true, index: { unique: true } },
        phone: {
            type: String,
            required: false,
            trim: true,
            // Validator Library
            validate(value) {
                if (!validator.isMobilePhone(value)) {
                    throw new Error("Invalid phone number");
                }
            },
            index: { unique: true, sparse: true }
        }
    },
    auth: {
        token: { type: String, required: true, default: 'temp' },
        username: { type: String, required: true, trim: true, lowercase: true, index: { unique: true } },
        password: { type: String, required: true },
        login_attempts: { type: Number, required: true, default: 0 },
        locked_until: { type: Number },
    },
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
