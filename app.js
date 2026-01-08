require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contact');

var app = express();
const cors = require('cors');
const allowedOrigins = [ // Production 
    'https://sio2renovations.com', 
    'https://www.sio2renovations.com', 
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allows requests without origin (mobile apps, curl, Postman)

        if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) // Allows localhost and 127.0.0.1 dynamically (http://localhost:50789; http://localhost:5173; http://127.0.0.1:8080)
            return callback(null, true);

        if (allowedOrigins.includes(origin)) // Allows production origins
            return callback(null, true);

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true // Allows the browser to send cookies, tokens or auth headers.
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);

module.exports = app;
