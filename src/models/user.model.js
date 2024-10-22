import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        required: true
    },
    telegram_id: {
        type: String,
        required: true
    },
    referral:{
        type: String,
        default: null
    },
    invited_friends:{
        type: Number,
        default: []
    },
}, {
    timestamps: true
});

const User = mongoose.model('users', userSchema);

export default User;
