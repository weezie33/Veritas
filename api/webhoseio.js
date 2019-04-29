require('dotenv').config();
module.exports = (req, res) => {
  const db = require('../models');
  const webhoseio = require('webhoseio');
  const moment = require('moment');

  const client = webhoseio.config({
    token: process.env.WEBHOSEIO_TOKEN
  });

  const STORES =
    '(site:walmart.com OR site:kroger.com OR site:amazon.com OR site:costco.com OR site:homedepot.com OR site:walgreens.com OR site:cvs.com OR site:target.com OR site:lowes.com OR site:apple.com OR site:bestbuy.com OR site:macys.com OR site:riteaid.com OR site:starbucks.com OR site:rossstores.com)';

  let unixTime = () => {
    let days = moment()
      .subtract(30, 'days')
      .calendar();
    let date = new Date(days);
    return date.valueOf();
  };
  const query_params = {
    q: 'item.title:' + req.params.item_title + ' ' + STORES + ' ' + 'rating:>0',
    ts: unixTime(),
    sort: 'rating'
  };

  client
    .query('reviewFilter', query_params)
    .then(output => {
      // console.log(output.reviews);
      for (const key in output.reviews) {
        console.log(
          `${key + 1} = ${JSON.stringify(output.reviews[key], null, 2)}`
        );
        let currentKey = output.reviews[key];
        db.reviews
          .bulkCreate([
            {
              uuid: currentKey.uuid,
              url: currentKey.url,
              author: currentKey.author,
              published: currentKey.published,
              title: currentKey.title,
              text: currentKey.text,
              language: currentKey.language,
              rating: currentKey.rating,
              crawled: currentKey.crawled
            }
          ])
          .then(dbres => {
            console.log(dbres);
          });
      }
      // console.log(output['reviews']['published']); // Print the text of the first review publication date
      // console.log(output);
      // next();
      let reviews = output.reviews;
      res.render('webhose', { reviews });
    })
    .catch(err => {
      if (err) throw err;
    });
};