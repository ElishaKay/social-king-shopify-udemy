const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// app
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '200mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}))

app.use(cors({ origin: "*" }));

// Send everything from this route back as liquid.
app.use((req, res, next) => {
  res.set('Content-Type', 'application/liquid');
  return next();
});

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    process.on('uncaughtException', function(err) {
      console.log('Caught exception: ' + err);
    });
});

