require('dotenv').config();
module.exports = (req, res) => {
  const app = require('../server');
  const db = require('../models');
  const webhoseio = require('webhoseio');

  const client = webhoseio.config({
    token: process.env.WEBHOSEIO_TOKEN
  });

  const query_params = {
    q:
      'item.title:' +
      req.params.item_title +
      ' ' +
      'site:amazon.com' +
      ' ' +
      'rating:>0',
    ts: '1553965699215',
    sort: 'rating'
  };
  client
    .query('reviewFilter', query_params)
    .then(output => {
      console.log(output.reviews); // Print the text of the first review
      console.log(output['reviews']['published']); // Print the text of the first review publication date
      console.log(output);
      // next();
      res.render('webhose', { output });
    })
    .catch(err => {
      if (err) throw err;
    });
};
