// Import the 'mongoose' library for working with MongoDB.
import mongoose from "mongoose"; 

// Import the 'bcrypt' library for password hashing and comparison.
import bcrypt from "bcrypt";

// Define a Mongoose schema for the 'User' model.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        requiered: true, // Field is required
        trim: true // Remove extra white spaces
    },
    password: {
        type: String,
        requiered: true,
        trim: true    
    },
    email: {
        type: String,
        requiered: true,
        trim: true,
        unique: true,
    },
    token: {
        type: String,
    },
    confirm : {
        type: Boolean,
        default: false,
    },
    user: {
        type: String,
        requiered: false,
        trim: true,
        unique: true,
    }
}, {
    timestamps: true,
});

// Define a pre-save hook to hash the user's password before saving to the database.
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Define a method to check the provided password against the hashed password in the database.
userSchema.methods.checkPassword = async function(passwordForm) {
    return await bcrypt.compare(passwordForm, this.password)
};

// Create a Mongoose model named 'User' using the defined schema.
const User = mongoose.model("User", userSchema);

export default User;
