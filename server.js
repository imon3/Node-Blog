const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postRouter = require('./data/router/post-router');
const userRouter = require('./data/router/post-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan());
server.use('/api/post', postRouter);
server.use('/api/user', userRouter);


server.get('/', (req, res) => {
    res.send('Server Running');
});

module.exports = server;