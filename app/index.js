// Framework Dependencies.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// File Dependencies.
const config = require('../config');
// Routes.
const routes = require('./routes');

// Express configuration.
const app = express()
// body-parser preferences.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// morgan preferences.
app.use(morgan('dev'));
// Set the app secret key.
app.set('secretKey', config.secret);
// Add routes.
app.use('/api/', routes);

// DB connection.
mongoose.Promise = global.Promise;
mongoose.connect(config.database)
.then(() => {
  console.log('DB Connected.')
  // Initiate listening.
  app.listen(config.port, (error) => {
    if (error) {
      console.log('Server became deaf!');
      process.exit(1);
    }
    console.log(`listening to port: ${config.port}`);
  });
})
.catch((error) => {
  console.log('Failed to connect to DB.', error);
});
