const express = require('express');

const PostDb = require('../helpers/postDb');

const router = express.Router();

// GET REQUEST
router.get('/', async (req, res) => {
    try {
        const posts = await PostDb.get(req.query);
        res.status(200).json(posts)
    } catch {
        res.status(500).json({
            error: 'There was a problem retrieving the posts'
        })
    }
})

router.get('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

module.exports = router;