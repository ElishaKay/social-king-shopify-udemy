/**
 * ./routes/proxy.js
 * This is where you'll set up anything to do with your app proxy if you have one set up.
 */
const Liquid = require('liquid')
const engine = new Liquid.Engine()
const express = require('express');

const router = express.Router();

// Send everything from this route back as liquid.
router.use((req, res, next) => {
  res.set('Content-Type', 'application/liquid');
  return next();
});

router.get('/', (req, res, next) => {
  engine
  .parse('hi {{name}}')
  .then(template => template.render({ name: 'tobi' }))
  .then(result => {
  	console.log(result)
  	return res.send(result);
  })
  // res.sendStatus(200);
  next();
});

module.exports = router;
