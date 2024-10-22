import verifySchema from '../validators/validate.js';
import schema from '../validators/schema.json' assert { type: "json" };
import User from '../models/user.model.js';



export const register = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(200).send({ success: true });
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
            if(!newUser.referral_id){
                newUser.referral_id = existingUser.telegram_id;
                const updatedNewUser = await newUser.save();
            }

            const index = existingUser.invited_friends.findIndex((id) => id == newUser._id);
            // if(index != -1){
                existingUser.invited_friends = [...existingUser.invited_friends, newUser._id];
                result = await existingUser.save();
            // }
        }

        res.status(200).send({ success: true, data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

