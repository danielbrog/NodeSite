const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
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

router.get('/tasks', auth, async (req, res) => {

	try {
        await req.user.populate('tasks').execPopulate()
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