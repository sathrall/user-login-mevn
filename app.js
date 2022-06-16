const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');

// init app
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// setup passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// static paths
app.use(express.static(path.join(__dirname, 'public')));

// db config
const db = require('./config/keys').mongoUri;
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected successfully...')
}).catch(err => {
    console.log(`Unable to connect to db ${err}`)
});

// routes
const users = require('./routes/api/users');
app.use('/api/users', users);

// spin up and listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});