const express = require('express');
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');
const contestRouter = require('./router/contestRouter');
const chatRouter = require('./router/chatRouter');

const router = express.Router();

//authRouter

router.use('/auth', authRouter);

//userRouter

router.use('/users', userRouter);

//contestRouter

router.use('/contests', contestRouter);

//chatRouter

router.use('/chats', chatRouter);

module.exports = router;
