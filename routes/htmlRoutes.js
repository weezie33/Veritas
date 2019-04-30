var db = require('../models');
const webhoseio = require('../api/webhoseio');
const yelp = require('../api/yelp');

module.exports = function(app) {
  db.products.hasMany(db.reviews, { foreignKey: 'id' });
  db.reviews.belongsTo(db.products, { foreignKey: 'id' });
  // Loads the reviews page, should be in apiRoutes
  app.get('/app/reviews', function(req, res) {
    db.reviews.findAll({}).then(function(result) {
      res.render('dbtest', {
        result
      });
    });
  });

  //sets up query variables to
  app.get('/404', function(req, res) {
    let qErr = req.query.qErr;
    res.render('404', { qErr });
  });

  //Loads the index.handlebars on homepage
  app.get('/', (req, res) => {
    res.render('index');
  });

  // app.get('/api/reviews/:id', function(req, res) {
  //   db.reviews
  //     .findAll({
  //       where: {
  //         id: req.params.id
  //       }
  //     })
  //     .then(function(result) {
  //       // res.render('dbtest', {
  //       //   result
  //       // });
  //       res.json(result);
  //     });
  // });

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
