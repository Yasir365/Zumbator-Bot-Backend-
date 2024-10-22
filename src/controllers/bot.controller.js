// import verifySchema from '../validators/validate.js';
// import schema from '../validators/schema.json' assert { type: "json" };
// import User from '../models/user.model.js';



export const register = (req, res) => {
    const data = req.body;
    res.status(200).send({ success: true });
}

