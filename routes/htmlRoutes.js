var db = require('../models');
const webhoseio = require('../api/webhoseio');
const yelp = require('../api/yelp');

module.exports = function(app) {
  db.products.hasMany(db.reviews, { foreignKey: 'id' });
  db.reviews.belongsTo(db.products, { foreignKey: 'id' });
  // Load index page
  app.get('/reviews', function(req, res) {
    db.reviews.findAll({}).then(function(result) {
      res.render('index', {
        result
      });
    });
  });
  app.get('/reviews/:id', function(req, res) {
    db.reviews
      .findAll({
        where: {
          id: req.params.id
        }
      })
      .then(function(result) {
        console.log(result);
        res.render('dbtest', {
          result
        });
      });
  });

  app.get('/dbtest', function(req, res) {
    if (req.params.search === 'favicon.ico') {
      res.redirect('/');
    } else {
      db.reviews.findAll({}).then(function(result) {
        // console.log(result);
        res.render('dbtest', {
          result
        });
      });
    }
  });

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/search/:item_title', function(req, res) {
    webhoseio(req, res);
  });

  app.get('/yelp/:name/:location', (req, res) => {
    yelp(req, res);
  });
  // Render mapbox
  app.get('/mapbox', function(req, res) {
    res.render('mapbox');
  });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });

};

//TODO
/* 
* change the 'dbtest'

*/
