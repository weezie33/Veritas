var db = require('../models');
const webhoseio = require('../api/webhoseio');
const yelp = require('../api/yelp');

module.exports = function(app) {
  db.products.hasMany(db.reviews, { foreignKey: 'id' });
  db.reviews.belongsTo(db.products, { foreignKey: 'id' });

  //searches the webhoseAPI for the specified product
  app.get('/app/search/:item_title', (req, res) => {
    webhoseio(req, res);
  });

  //searches the DB for a specific review/product by ID
  app.get('/api/reviews/:id', (req, res) => {
    db.reviews
      .findAll({
        where: {
          id: req.params.id
        },
        include: [db.products]
      })
      .then(results => {
        if (results.length > 0) {
          res.json(results);
        } else {
          let qErr = `Sorry, ID ${req.body.id ||
            req.params.id} could not be found`;
          res.redirect('/404?qErr=' + qErr);
        }
      })
      .catch(err => {
        throw err;
      });
  });

  //searches the DB by ID for both reviews/products and returns a JSON of the product
  app.get('/api/products/:id', (req, res) => {
    db.reviews
      .findAll({
        where: {
          id: req.params.id
        },
        include: [db.products] //<-- this includes products INTO reviews
      })
      .then(results => {
        if (results.length > 0) {
          let productJSON = results[0].product.dataValues;
          res.json(productJSON);
        } else {
          let qErr = `Sorry, ID ${req.body.id ||
            req.params.id} could not be found`;
          res.redirect('/404?qErr=' + qErr);
        }
      })
      .catch(err => {
        if (err) throw err;
        let qErr = `Sorry, ID ${req.body.id ||
          req.params.id} could not be found`;
        res.redirect('/404?qErr=' + qErr);
      });
  });

  app.get('/api/yelp/:name/:location', (req, res) => {
    if ((req.params.location = '' || !req.params.location)) {
      req.body.location = 'washington,dc';
    }
    yelp(req, res);
  });

  // this would allow you to post, all it needs is key "item_title"
  //doesn't need to do anything, web traffic literally goes thru the webhoseio file
  app.post('/api/search/', webhoseio);

  // Delete an product/review by id
  app.delete('/api/kill/:id', (req, res) => {
    db.reviews
      .destroy({ where: { id: req.params.id }, include: [db.products] })
      .then(dbres => {
        switch (dbres) {
          case 0:
            res.redirect(
              `/404?qErr=Sorry,ID${req.body.id || req.params.id}couldnotbefound`
            );
            break;
          case 1:
            res.json(`Succesfully deleted id ${req.params.id || req.body.id}`);
            break;
          default:
            res.redirect(
              `/404?qErr=Sorry,ID${req.body.id || req.params.id}couldnotbefound`
            );
            break;
        }
      })
      .catch(err => {
        if (err) throw err;
        res.redirect(
          `/404?qErr=Sorry,ID${req.body.id || req.params.id}couldnotbefound`
        );
      });
  });
};
