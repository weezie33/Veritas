var db = require('../models');

module.exports = function(app) {
  // Load index page
  app.get('/:search', function(req, res) {
    if (req.params.search === 'favicon.ico') {
      res.redirect('/');
    } else {
      db.new_search_db
        .findAll({ where: { search_term: req.params.search } })
        .then(function(result) {
          console.log(result.dataValues);
          res.render('index', {
            msg: req.params.search,
            search_term: []
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
