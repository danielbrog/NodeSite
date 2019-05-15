const express = require('express')
const router = new express.Router()

router.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Daniel Brog'
	})
})

router.get('/app', (req, res) => {
	res.render('AppList', {
		title: 'List of Apps',
		name: 'Daniel Brog'
	})
})
/*
router.get('/help', (req, res) => {
	res.render('help', {
		title: 'Need Help?',
		name: 'Daniel Brog',
		helpText: 'If you need any help, or have comments/concerns please let me know at: ',
		email: 'brog.daniel@gmail.com'
	})
})

router.get('/help/*', (req, res) => {
	res.render('404', {
		error: '404',
		errorMessage: 'Help article not found',
		name: 'Daniel Brog'
	})

})
*/
router.get('/login', (req, res) => {
	res.render('login', {
		title: 'Login',
		name: 'Daniel Brog',
	})
})

router.get('/profile', (req, res) => {
	res.render('profile', {
		title: 'Profile',
		name: 'Daniel Brog',
	})
})

module.exports = router