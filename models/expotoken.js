'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpoToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  ExpoToken.init({
    token: DataTypes.TEXT,
    UserId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ExpoToken',
  });
  return ExpoToken;
};