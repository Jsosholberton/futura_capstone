// Import the 'mongoose' library for working with MongoDB.
import mongoose from "mongoose"; 

// Import the 'bcrypt' library for password hashing and comparison.
import bcrypt from "bcrypt";

/**
 * Mongoose schema to represent a user.
 */
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // Should be 'required' instead of 'requiered'
        trim: true
    },
    password: {
        type: String,
        required: true, // Should be 'required' instead of 'requiered'
        trim: true
    },
    email: {
        type: String,
        required: true, // Should be 'required' instead of 'requiered'
        trim: true,
        unique: true,
    },
    token: {
        type: String,
    },
    confirm: {
        type: Boolean,
        default: false,
    },
    user: {
        type: String,
        required: false,
        trim: true,
        unique: true,
    },
    notion: {
        type: String,
        required: false,
        trim: true,
        unique: true,
    },
    gpt: {
        type: String,
        required: false,
        trim: true,
        unique: true,
    },
}, {
    timestamps: true,
});

/**
 * Middleware to hash the password before saving the user to the database.
 */
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Method to verify if the provided password matches the stored password.
 * @param {string} passwordForm - The provided password to verify.
 * @returns {Promise<boolean>} Returns true if the password matches, otherwise false.
 */
userSchema.methods.checkPassword = async function(passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
};

/**
 * Mongoose model for the user entity.
 */
const User = mongoose.model("User", userSchema);

export default User;
