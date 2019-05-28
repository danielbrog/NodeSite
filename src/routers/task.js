const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.get('/taskApp', async  (req, res) => {
	res.render('apps/task', {
		title: 'Tasks',
		name: 'Daniel Brog'
	})
})

router.post('/tasks',  async (req, res) => {
    const task = new Task({
        ... req.body,
        author: req.user._id
    })

	try {
		await task.save()
		res.status(201).send(task)
	} catch (e) {
		res.status(400).send(e)
	}
})
//GET tasks ?completed=true
//GET tasks ?limit=x&skip=y
//GET tasts ?sortBy=desc/asc

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

	try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
		res.status(201).send(req.user.tasks)
	} catch (e) {
		res.status(500).send()
	}
})

router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id

	try {
		const task = await Task.findOne({ _id, author: req.user._id})
		if (!task) {
			return res.status(404).send()
		}
		res.send(task)
	} catch (e) {
		res.send(500).send()
	}
})

router.patch('/tasks/:id', async (req, res) => {
	const tasks = Object.keys(req.body)
	const allowedUpdates = ['description', 'completed']
	const isValidOperation = tasks.every((task) => (allowedUpdates).includes(task))

	if (!isValidOperation) {
		return res.status(500).send({ error: 'Invalid Updates' })
	}

	try {
        const task = await Task.findOne({ _id: req.params.id, author: req.user._id})

        if (!task) {
			res.status(404).send()
        }
        
        tasks.forEach((task) => updatedTask[task] = req.body[task])
        await updatedTask.save()
		res.send(task)
	} catch (e) {
		res.status(500).send(e)
	}
})

router.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({_id: req.params.id, author: req.user._id})
		if (!task) {
			return res.status(404).send()
		}
		res.send(task)
	} catch (e) {
		res.status(500).send(e)
	}
})


module.exports = router