module.exports = function(sequelize, DataTypes) {
  var historicSearch = sequelize.define(
    'historic_search_db',
    {
      search_term: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );
  return historicSearch;
};
