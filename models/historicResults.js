module.exports = function(sequelize, DataTypes) {
  var historicResults = sequelize.define(
    'historic_results_db',
    {
      search_term: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );
  return historicResults;
};
