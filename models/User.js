/**
 * @author Mayank Bagla, Ram prasath Meganathan (B00851418)
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Donor', 'admin', 'Requestor'],
        required: true
    },
    resetLink:{
        data:String,
        default:''
    },

    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "userfeedback" }],
    
},{timestamps:true});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err);
        else {
            if (!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
        }
    });
}

module.exports = mongoose.model('User', UserSchema);