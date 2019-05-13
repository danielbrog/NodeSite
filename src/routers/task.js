const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
	const task = new Task(req.body)

	try {
		await task.save()
		res.status(201).send(task)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.get('/tasks', async (req, res) => {

	try {
		const tasks = await Task.find({})
		res.status(201).send(tasks)
	} catch (e) {
		res.status(500).send()
	}
})

router.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id

	try {
		const task = await Task.findById(_id)
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
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
		if (!task) {
			res.status(404).send()
		}
		res.send(task)
	} catch (e) {
		res.status(500).send(e)
	}
})

router.delete('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id)
		if (!task) {
			return res.status(404).send()
		}
		res.send(task)
	} catch (e) {
		res.status(500).send(e)
	}
})


module.exports = router