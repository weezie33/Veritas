var db = require('../models');

module.exports = function(app) {
  // Load index page
  app.get('/reviews', function(req, res) {
    if (req.params.search === 'favicon.ico') {
      res.redirect('/');
    } else {
      db.reviews.findAll({}).then(function(result) {
        // console.log(result);
        res.render('index', {
          result
        });
      });
    }
  });
  app.get('/reviews/:id', function(req, res) {
    if (req.params.search === 'favicon.ico') {
      res.redirect('/');
    } else {
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
    }
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

  // Load example page and pass in an example by id
  app.get('/example/:id', function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render('example', {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
