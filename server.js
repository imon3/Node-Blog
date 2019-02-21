const express = require('express');

const userPostRouter = require('./data/router/user-post-router');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan());
server.use('/api', userPostRouter, restriction, userName('mike'));


server.get('/', (req, res) => {
    res.send('Server Running');
});

function restriction(req, res, next) {
    const password = req.headers.authentication;
    if (password === 'password') {
        next()
    } else {
        res.status(401).json({
            message: 'incorrect password'
        })
    }
}

function userName(name) {
    return function (req, res, next) {
        const username = req.headers.name;
        if (username === '') {
            res.status(404).json({
                message: 'incorrect name.'
            })
        } else if (username.toLowercase() !== name) {
            res.status(404).json({
                message: 'incorrect name.'
            })
        } else {
            next();
        }
    }
}

module.exports = server;