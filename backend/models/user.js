const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});



// ✅ Add method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return candidatePassword === this.password;
};


module.exports = mongoose.model('User', UserSchema);
