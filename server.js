//basic app to demo functionality not actually safe for production

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const { userModel } = require('./models/user');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/register', (req, res) => {
    return res.sendFile(__dirname + '/views/registration.html');
});

app.get('/login', (req, res) => {
    return res.sendFile(__dirname + '/views/login.html');
});

app.get('/notary', (req, res) => {
    return res.sendFile(__dirname + '/views/index.html');
});

app.post('/register', async (req, res) => {
    const { userId, email, password } = req.body;

    const newUser = new userModel({ userId, email, password });

    newUser.save();

    return res.redirect('/login');
});

app.post('/login', async (req, res) => {
    const { userId, password } = req.body;

    const correctUser = await userModel.findOne({ userId, password });

    if (!correctUser) return res.send({ message: 'Invalid credentials' });

    return res.redirect('/notary');
});

app.listen(3000, async () => {
    await mongoose.connect(process.env.MONGO_URI);
});