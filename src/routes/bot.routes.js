import express from 'express';
import { register, saveRefUser, getInvitedFriends } from '../controllers/bot.controller.js';

var router = express.Router();

router.post("/register", register)
router.post("/saveRefUser", saveRefUser)
router.post("/getInvitedFriends", getInvitedFriends)

export default router;
