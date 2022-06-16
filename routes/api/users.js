const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;

// load in our validation scripts
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load in our user model
const User = require('../../models/User');

/**
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */
router.post('/register', (req, res) => {
    let { username, email, password, confirm_password } = req.body

    // validate our form
    const { errors, isValid } = validateRegisterInput(req.body)

    // check for errors
    if (!isValid) {
        return res.status(400).json(errors)
    }

    // check to see if the username exists
    User.findOne({
        username: username
    }).then(user => {
        if (user) {
            return res.status(400).json({
                username: 'Username already exists'
            })
        } else {
            // check to see if the email exists
            User.findOne({
                email: email
            }).then(user => {
                if (user) {
                    return res.status(400).json({
                        email: 'Email already exists'
                    })
                } else {
                    // create the newUser object
                    let newUser = new User({
                        username: username,
                        email: email,
                        password: password,
                    })

                    // hash our password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;

                            newUser.save()
                                .then(user => {
                                        return res.status(201).json({
                                            success: true,
                                            message: 'User has been registered',
                                        })
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
})


/**
 * @route POST api/users/login
 * @desc Login the user
 * @access Public
 */
router.post('/login', (req, res) => {
    let { username, password } = req.body

    // validate our form
    const { errors, isValid } = validateLoginInput(req.body)

    // check for errors
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ username: username })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    username: 'User not found'
                })
            }

            bcrypt.compare(password, user.password)
                  .then(isMatch => {
                    if (!isMatch) {
                        return res.status(404).json({
                            success: false,
                            password: 'Incorrect password'
                        });
                    } else {
                        const payload = {
                            _id: user._id,
                            username: user.username,
                            email: user.email
                        }

                        jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
                            res.status(200).json({
                                success: true,
                                token: `Bearer ${token}`,
                                user: user,
                                message: 'User logged in'
                            })
                        })
                    }
                  })
        })
        .catch(err => console.log(err))
})


/**
 * @route GET api/users/profile
 * @desc Return the user's data
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    })
})


/**
 * @route GET api/users/
 * @desc [DEV] Return all users
 * @access Private
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        if (!users) throw new Error('No users')
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


/**
 * @route DELETE api/users/:id
 * @desc [DEV] Find and delete a user by their id
 * @access Private
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const removed = await User.findByIdAndDelete(id)
        if (!removed) throw new Error('Something went wrong while removing the user')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router;