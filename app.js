const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Routes
const proxy = require('./routes/proxy');

require('dotenv').config();

const app = express();

app.use(bodyParser.json({
        type:'application/json',
        limit: '50mb',
        verify: function(req, res, buf) {
            if (req.url.startsWith('/webhook')){
                req.rawbody = buf;
            }
        }
    })
);



app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('trust proxy', 1);

// Routes
app.use('/', index);

app.use('/proxy', proxy);

module.exports = app;
