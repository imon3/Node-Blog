const express = require('express');

const userPostRouter = require('./data/router/user-post-router');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan());
server.use('/api', userPostRouter);


server.get('/', (req, res) => {
    res.send('Server Running');
});

module.exports = server;