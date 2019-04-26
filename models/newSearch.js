module.exports = function(sequelize, DataTypes) {
  var newSearch = sequelize.define("new_search_db", {
  // "Product Table"
  // ProductId, Name, Make, Model, Year, Price, Review, Summary, Name, UPC, ISBN, GTIN, MPN, ITF, Brand
   ProductId: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Make: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Model: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Year: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Price: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Review: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    UPC: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [12]
        }
      },
    ISBN: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [13]
        }
      },
    GTIN: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
        }
      },
    MPN: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
        }
      },
    ITF: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [14]
        }
      },
    Brand: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    //"Distributor Table"
    //DistributorId, Name, Quantity, Website, Street, City, State, Country, Distance
    DistributorId: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Quantity: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Website: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Street: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    City: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    State: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Country: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
    Distance: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
  ///END///
    });
  return newSearch;
};



// "Product Table"
// ProductId, Name, Make, Model, Year, Price, Review, Summary, Name, UPC, ISBN, GTIN, MPN, ITF, Brand

// "Distributor Table"
// DistributorId, Name, Quantity, Website, Street, City, State, Country, Distance 

// https://support.google.com/merchants/answer/160161?hl=en

// "Universal  Code (UPC)"
// "International Standard Book Number (ISBN)"
// "Global Trade Item Numbers (GTIN)"
// "Manufacturer Part Numbers (MPN)"
// "Interleaved 2 of 5 (ITF-14)"


// "JOIN   Table +  Table"
// ID



// {
//       "item": {
//         "uuid": "48c2d16e6757c81c1337784d67597e6178276ceb",
//         "url": "http://www.amazon.com/-reviews/B003XU3C7M/",
//         "site_full": "www.amazon.com",
//         "site": "amazon.com",
//         "site_section": "http://www.amazon.com/s/ref=nb_sb_noss?field-keywords=%22hamilton+blender%22",
//         "site_categories":,
//         "section_title": "http://www.amazon.com/",
//         "title": "Ninja 400-Watt Blender/Food Processor for Frozen Blending, Chopping and Food Prep with 48-Ounce Pitcher and 16-Ounce Chopper Bowl (QB900B), Silver",
//         "title_full": "Amazon.com: Customer reviews: Ninja 400-Watt Blender/Food Processor for Frozen Blending, Chopping and Food Prep with 48-Ounce Pitcher and 16-Ounce Chopper Bowl (QB900B), Silver",
//         "published": "2019-03-30T03:00:00.000+03:00",
//         "reviews_count": 9,
//         "reviewers_count": 10,
//         "country": "US",
//         "spam_score": 0.0,
//         "main_image": "",
//         "domain_rank": null
//       },
//       "uuid": "4c9feb35ca81e051493eddc6e8f3a6ad3abbd262",
//       "url": "http://www.amazon.com/-reviews/B003XU3C7M/#customer_review-R3RFGZQ7V1SE28",
//       "ord_in_thread": 8,
//       "author": "Maribel Villegas",
//       "published": "2019-04-09T03:00:00.000+03:00",
//       "title": "Good buy.",
//       "text": "Perfect! i really love it. Works perfectly. Makes a perfect smoothie in seconds.",
//       "highlightText": "",
//       "highlightTitle": "",
//       "language": "english",
//       "external_links": [],
//       "rating": 5.0,
//       "crawled": "2019-04-12T01:41:50.018+03:00"
//     },