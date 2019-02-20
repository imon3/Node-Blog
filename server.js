const express = require('express');

const postRouter = require('./data/router/post-router');
const userRouter = require('./data/router/user-router');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send('Server Running');
});

module.exports = server;