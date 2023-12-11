import mongoose  from "mongoose";

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 50
    },
    picturePath: {
        type: String,
        default: ''
    },
    friends: {
        type: Array,
        default: []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
}, {timestamps: true});

// module.exports = mongoose.model('User', UserSchema); // actually this is the syntax but since we have modified package JSON
const User = mongoose.model('User', UserSchema);
export default User;