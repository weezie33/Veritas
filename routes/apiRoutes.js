var db = require('../models');
const webhoseio = require('../api/webhoseio');

module.exports = function(app) {
  db.products.hasMany(db.reviews, { foreignKey: 'id' });
  db.reviews.belongsTo(db.products, { foreignKey: 'id' });

  app.get('/api/search/:id', function(req, res) {
    db.reviews
      .findAll({
        where: {
          id: req.params.id
        },
        include: [db.products]
      })
      .then(results => {
        console.log(results);
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
