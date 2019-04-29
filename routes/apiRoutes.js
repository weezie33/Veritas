var db = require('../models');
const webhoseio = require('../api/webhoseio');

module.exports = function(app) {
  app.get('/api/search/:search', function(req, res) {
    db.new_search_db
      .findAll({
        where: {
          productName: req.params.search
        }
      })
      .then(results => {
        console.log(results);
        res.redirect('/api/search/select', 304);
      })
      .catch(err => {
        setTimeout(() => {
          res.redirect('/');
          throw err;
        }, 1000);
      });
  });

  app.get('/api/search/select', (req, res) => {
    db;
  });

  // Create a new example
  app.post('/api/search', webhoseio, function(req, res) {
    db.new_search_db.create(req.body).then(function(dbExample) {
      console.log(req.body);
      console.log(dbExample);
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete('/api/examples/:id', function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
