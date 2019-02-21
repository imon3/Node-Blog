const express = require('express');

const UserDb = require('../helpers/userDb');
const PostDb = require('../helpers/postDb');

const router = express.Router();

// -----------USERS REQUEST METHODS
// GET REQUEST
router.get('/users', async (req, res) => {
    try {
        const users = await UserDb.get(req.query);
        res.status(200).json(users)
    } catch {
        res.status(500).json({
            error: 'There was a problem retrieving the users'
        })
    }
})

router.get('/users/:id', async (req, res) => {
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

router.get('/users/:id/posts', async (req, res) => {
    try {
        const userPosts = await UserDb.getUserPosts(req.params.id);

        if (userPosts.length > 0) {
            res.status(200).json(userPosts)
        } else {
            res.status(404).json({
                message: 'The user could not be found.'
            })
        }
    } catch {
        res.status(500).json({
            error: 'Error retrieving user post.'
        })
    }
})

// CREATE REQUEST
router.post('/users/', async (req, res) => {
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
router.put('/users/:id', async (req, res) => {
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
router.delete('/users/:id', async (req, res) => {
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

// ----------POST REQUEST METHODS
// GET REQUEST
router.get('/posts', async (req, res) => {
    try {
        const posts = await PostDb.get(req.query);
        res.status(200).json(posts)
    } catch {
        res.status(500).json({
            error: 'There was a problem retrieving the posts'
        })
    }
})

router.get('/posts/:id', async (req, res) => {
    try {
        const post = await PostDb.getById(req.params.id)
        if (user) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: 'Post not found'
            })
        }
    } catch {
        res.status(500).json({
            error: 'Error retrieving post'
        })
    }
})

// CREATE REQUEST
router.post('/posts', async (req, res) => {
    try {
        const newPost = await PostDb.insert(req.body);
        res.status(201).json(newPost)
    } catch {
        res.status(500).json({
            error: 'Add post failed.'
        })
    }
})

// UPDATE REQUEST
router.put('/posts/:id', async (req, res) => {
    try {
        const post = await PostDb.update(req.params.id, req.body);
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: 'The post could not found'
            })
        }
    } catch {
        res.status(500).json({
            error: 'There was a problem updating the post.'
        })
    }
})

//DELETE REQUEST
router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await PostDb.remove(req.params.id);
        if (post > 0) {
            res.status(200).json({
                message: 'The post has been removed.'
            })
        } else {
            res.status(404).json({
                message: 'The post could not be found to be removed.'
            })
        }
    } catch {
        res.status(500).json({
            error: 'There was an error removing post.'
        })
    }
})



// TIMEOUT ERROR 
router.use((req, res) => {
    res.status(404).send('Page could not load.')
})

module.exports = router;