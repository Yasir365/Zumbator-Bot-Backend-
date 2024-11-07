import verifySchema from '../validators/validate.js';
import schema from '../validators/schema.json' assert { type: "json" };
import User from '../models/user.model.js';



export const register = async (req, res) => {
    const user = new User(req.body);
    if (user.start_param) {
        delete user.start_param
    }

    try {
        const existingUser = await User.findOne({ 'user.id': req.body.user.id });

        if (existingUser) {
            res.status(200).send({ success: true, data: existingUser, message: 'User already exists' });
            return;
        }
        const data = await user.save();
        res.status(200).send({ success: true, data: data, message: 'New user created' });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}

export const saveReferal = async (req, res) => {
    const { referral_id, user_id } = req.body;

    try {
        const newUser = await User.findOne({ '_id': user_id });
        const existingUser = await User.findOne({ 'user.id': referral_id });

        if (!newUser) {
            return res.status(200).send({ success: false, message: 'User not found' });
        }

        if (newUser && existingUser) {
            if (!newUser.referral_id) {
                // Set referral_id for the newUser
                newUser.referral_id = referral_id;
                const updatedNewUser = await newUser.save();

                // Add newUser to existingUser's invited_friends list if not already there
                const index = existingUser.invited_friends.findIndex((id) => id === user._id);
                if (index === -1) {
                    existingUser.invited_friends.push(user_id);
                    await existingUser.save();
                }

                return res.status(200).send({ success: true, data: updatedNewUser });
            }
            return res.status(200).send({ success: false, message: 'User already referred' });
        }

        return res.status(200).send({ success: false, message: 'Referral user not found' });

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

export const getReferal = async (req, res) => {
    const user = req.body;

    try {
        const existingUser = await User.findOne({ 'user.id': user.referral_id });
        if (!existingUser) {
            res.status(200).send({ success: true, message: 'User not found' });
            return;
        }

        res.status(200).send({ success: true, data: existingUser });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

export const getInvitedFriends = async (req, res) => {
    const { _id: userId } = req.body;

    try {
        // Fetch user with only invited_friends field
        const user = await User.findById(userId).select('invited_friends');

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        console.log(user);


        // If invited_friends list is empty, return an empty data response
        if (user.invited_friends.length === 0) {
            return res.status(200).send({ success: true, data: [], message: 'No invited friends found' });
        }

        // Fetch all users with IDs in the invited_friends array
        const invitedUsers = await User.find({ _id: { $in: user.invited_friends } }).select('-__v');

        return res.status(200).send({ success: true, data: invitedUsers });
    } catch (error) {
        console.error('Error fetching invited friends:', error);
        return res.status(500).send({ success: false, message: 'Server error' });
    }
};

export const deleteAccount = async (req, res) => {
    const { userId } = req.body;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        return res.status(200).send({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).send({ success: false, message: 'Server error' });
    }
}

export const updatePoints = async (req, res) => {
    const { _id, points } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, { $inc: { points: points } }, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        return res.status(200).send({ success: true, data: updatedUser, message: 'Points updated successfully' });
    } catch (error) {
        console.error('Error updating points:', error);
        return res.status(500).send({ success: false, message: 'Server error' });
    }
};
