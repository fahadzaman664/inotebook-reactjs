const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser')
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'fahadisagoodb$oy';
//Route:1 create a user using: POST "/api/auth/createuser", no login required, 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password will be greater then Five alphabets').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors, return bad request and the errors and create user and save in database which is inotebook mention in db.js
     let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        success = false;
        return res.send({ success, errors: result.array() });
    }
    try {
        // check whether the user exist with the same email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
           success = false;
            return res.status(400).json({ success, error: "Sorry a user with this email already exist" });
        }
        // creating salt and hash for secure password by bcryptjs library
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);

        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        // send jwt io token to user when same user login 
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken: authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route: 2 authenticate a user using: POST "/api/auth/login", no login required, 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false;
    // if there are errors, return bad request and the errors 
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
        // check whether the user exist with the same email
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct  credential" });
        }
        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct  credential" });
        }

        // send jwt io token 
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route:3  get logdin user detail using: POST "/api/auth/getuser", login required, 
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userId = req.user.id; // coming from fetchuser middleware function
        const user = await User.findById(userId).select("-password");
        res.send(user);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});




module.exports = router;