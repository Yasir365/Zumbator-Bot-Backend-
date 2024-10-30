import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    auth_date: {
        type: String,
        required: true
    },
    chat_instance: {
        type: String,
        required: true
    },
    chat_type: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },

    user: {
        allows_write_to_pm: {
            type: Boolean,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        language_code: {
            type: String,
            required: true
        }
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
    points: {
        type: Number,
        default: 0
    },
    keys: {
        type: Number,
        default: 0
    },
    diamonds: {
        type: Number,
        default: 0
    },
    game_pass: {
        type: Number,
        default: 0
    },
    game_pass_last_purchase: {
        type: Date,
        default: null
    },
    user_level: {
        type: Number,
        default: 1
    }

}, {
    timestamps: true
});

const User = mongoose.model('zumator_users', userSchema);

export default User;