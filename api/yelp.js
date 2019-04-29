'use strict';
require('dotenv').config();
module.exports = (req, res) => {
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
        res.render('yelp', { idJSON });
      });
    })
    .catch(e => {
      console.log(e);
    });
};
