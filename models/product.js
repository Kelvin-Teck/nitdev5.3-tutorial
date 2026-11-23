const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Products", {
  id: {
    primaryKey: true,
        type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false,
  },
  discountPrice: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
  },
  reviews: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  colors: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false 
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    
}, {
    tableName: "products",
    timestamps: true
});


module.exports =  Product 