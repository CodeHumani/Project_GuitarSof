import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Tablature = sequelize.define('Tablature', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Tablature;
