/**
 * Author : Ram prasath Meganathan (B00851418)
 */
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("userfeedback", userSchema);
