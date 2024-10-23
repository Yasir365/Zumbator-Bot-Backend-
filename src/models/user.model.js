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
        type: Number,
        required: true
    },
    referral_id: {
        type: Number,
        default: null
    },
    invited_friends: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'zumator_users'
            }
        ],
        default: []
    },
}, {
    timestamps: true
});

const User = mongoose.model('zumator_users', userSchema);

export default User;
