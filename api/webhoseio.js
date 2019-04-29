require('../node_modules/dotenv').config();
module.exports = (req, res, next) => {
  const db = require('../models');
  const webhoseio = require('../node_modules/webhoseio');

  const client = webhoseio.config({
    token: process.env.WEBHOSEIO_TOKEN
  });

  const query_params = {
    q: `item.title:${req.body.search_term} site:${
      req.body.site_name
    } rating:>0`,
    ts: '1553535891983',
    sort: 'rating'
  };
  client
    .query('reviewFilter', query_params)
    .then(output => {
      console.log(output['reviews']['text']); // Print the text of the first review
      console.log(output['reviews']['published']); // Print the text of the first review publication date
      res.send(output['reviews']['text']);
    })
    .catch(err => {
      if (err) throw err;
    });
  next();
};
