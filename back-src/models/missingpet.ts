import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

export class MissingPet extends Model {}

MissingPet.init(
  {
    picURL: DataTypes.STRING,
    name: DataTypes.STRING,
    details: DataTypes.STRING,
    found: DataTypes.BOOLEAN,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    ownerEmail: DataTypes.STRING,
    ownerName: DataTypes.STRING,
  },
  { sequelize, modelName: "missingpet" }
);
