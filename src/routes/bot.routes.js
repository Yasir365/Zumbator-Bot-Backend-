import express from 'express';
import { register, saveReferal, getReferal, getInvitedFriends, deleteAccount } from '../controllers/bot.controller.js';

var router = express.Router();

router.post("/register", register)
router.post("/saveReferal", saveReferal)
router.post("/getReferal", getReferal)
router.post("/getInvitedFriends", getInvitedFriends)
router.post("/deleteAccount", deleteAccount)

export default router;
