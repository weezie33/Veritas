module.exports = function(sequelize, DataTypes) {
  var newSearch = sequelize.define(
    'new_search_db',
    {
      search_term: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );
  return newSearch;
};
