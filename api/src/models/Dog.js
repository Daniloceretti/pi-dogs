const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  
     life_span: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      minweight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      maxweight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      minheight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxheight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      createdInDataBase: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      },
  
  });
};
