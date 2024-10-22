import express from 'express';
import { register } from '../controllers/bot.controller.js';

var router = express.Router();

router.get("/register", register)

export default router;
