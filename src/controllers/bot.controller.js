import verifySchema from '../validators/validate.js';
import schema from '../validators/schema.json' assert { type: "json" };
import User from '../models/user.model.js';



export const register = async (req, res) => {
    const user = new User(req.body);

    try {
        const existingUser = await User.findOne({ telegram_id: user.telegram_id });

        if (existingUser) {
            res.status(200).send({ success: true, data: existingUser });
            return;
        }
        const data = await user.save();
        res.status(200).send({ success: true, data: data });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

export const saveRefUser = async (req, res) => {
    const { telegram_id, ref } = req.body;

    try {
        const newUser = await User.findOne({ telegram_id: telegram_id });
        const existingUser = await User.findOne({ telegram_id: ref });
        let result = {}
        if (newUser && existingUser) {
            if (!newUser.referral_id) {
                newUser.referral_id = existingUser.telegram_id;
                const updatedNewUser = await newUser.save();
            }

            const index = existingUser.invited_friends.findIndex((id) => id == newUser._id);
            if (index != -1) {
                existingUser.invited_friends = [...existingUser.invited_friends, newUser._id];
                result = await existingUser.save();
            }
        }

        res.status(200).send({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

export const getInvitedFriends = async (req, res) => {
    const user_id = req.body._id;

    try {
        const user = await User.findById(user_id).select('invited_friends');

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        if (!user.invited_friends || user.invited_friends.length === 0) {
            return res.status(200).send({ success: true, data: [], message: 'No invited friends found' });
        }

        const invitedUsers = await User.find({
            _id: { $in: user.invited_friends }
        });

        res.status(200).send({ success: true, data: invitedUsers });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
