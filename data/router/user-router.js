const express = require('express');

const UserDb = require('../helpers/userDb');

const router = express.Router();

// GET REQUEST
router.get('/', async (req, res) => {
    try {
        const users = await UserDb.get(req.query);
        res.status(200).json(users)
    } catch {
        res.status(500).json({
            error: 'There was a problem retrieving the users'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await UserDb.getById(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                message: 'User not found'
            })
        }
    } catch {
        res.status(500).json({
            error: 'Error retrieving user'
        })
    }
})

// CREATE REQUEST
router.post('/', async (req, res) => {
    try {
        const newUser = await UserDb.insert(req.body);
        res.status(201).json(newUser)
    } catch {
        res.status(500).json({
            error: 'Add user failed.'
        })
    }
})

// UPDATE REQUEST
router.put('/:id', async (req, res) => {
    try {
        const user = await UserDb.update(req.params.id, req.body);
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                message: 'The user could not found'
            })
        }
    } catch {
        res.status(500).json({
            error: 'There was a problem updating the user.'
        })
    }
})

//DELETE REQUEST
router.delete('/:id', async (req, res) => {
    try {
        const user = await UserDb.remove(req.params.id);
        if (user > 0) {
            res.status(200).json({
                message: 'The user has been removed.'
            })
        } else {
            res.status(404).json({
                message: 'The user could not be found to be removed.'
            })
        }
    } catch {
        res.status(500).json({
            error: 'There was an error removing user.'
        })
    }
})

// TIMEOUT ERROR 
router.use((req, res) => {
    res.status(404).send('Page took too long to load.')
})

module.exports = router;