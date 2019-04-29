'use strict';
require('dotenv').config();
module.exports = (req, res) => {
  const db = require('../models');
  const yelp = require('yelp-fusion');
  const client = yelp.client(process.env.YELPFUSION_KEY);

  let businessTerm = {
    term: req.params.name,
    location: req.params.location
  };
  client
    .search(businessTerm)
    .then(busiName => {
      let busiNameBody = busiName.body;
      let businesses = JSON.parse(busiNameBody);
      let businessId = businesses.businesses[0].id;

      client.business(businessId).then(response => {
        let idJSON = response.jsonBody;
        db.yelp
          .bulkCreate([
            {
              alias: idJSON.alias,
              yelp_id: idJSON.id,
              name: idJSON.name,
              image_url: idJSON.image_url,
              url: idJSON.url,
              phone: idJSON.display_phone,
              review_count: idJSON.review_count,
              rating: idJSON.rating,
              latitude: idJSON.coordinates.latitude,
              longitude: idJSON.coordinates.longitude
            }
          ])
          .then(dbres => {
            console.log(`Yelp info has been logged to YelpTable`);
          });
        res.render('yelp', { idJSON });
      });
    })
    .catch(e => {
      console.log(e);
    });
};
