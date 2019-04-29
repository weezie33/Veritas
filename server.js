require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require('./models');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

if (app.get('env') === 'development') {
  const logger = require('morgan');
  app.use(logger('dev'));
}

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// let thirtyDaysAgo = () => {
//   let days = moment()
//     .subtract(30, 'days')
//     .calendar();
//   let date = new Date(days);
//   return date.valueOf() / 10;
// };
// console.log(thirtyDaysAgo());

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log('Listening on http://localhost:%s/', PORT, PORT);
  });
});

module.exports = app;
