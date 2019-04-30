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
  if (req.params.item_title || req.body.item_title) {
    const query_params = {
      q:
        'item.title:' +
        (req.params.item_title || req.body.item_title) +
        '$' +
        ' ' +
        STORES +
        ' ' +
        'rating:>0',
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
              console.log(
                `${new Date()} Successfully logged into ReviewsTable`
              );
            });
          let itemKey = currentKey.item;

          db.products
            .bulkCreate([
              {
                uuid: itemKey.uuid,
                url: itemKey.url,
                site: itemKey.site,
                site_section: itemKey.site_section,
                title: itemKey.title,
                published: itemKey.published,
                reviews_count: itemKey.reviews_count,
                reviewers_count: itemKey.reviewers_count,
                country: itemKey.country,
                spam_score: itemKey.spam_score,
                main_image: itemKey.main_image
              }
            ])
            .then(dbres => {
              console.log(
                `${new Date()} Successfully logged into ProductsTable`
              );
            });
        }

        let reviews = output.reviews;
        res.render('webhose', { reviews });
        return next();
      })
      .catch(err => {
        if (err) throw err;
      });
  } else {
    let qErr = `Could not find the payload, try again!`;
    res.redirect('/404?qErr=' + qErr);
  }
};
