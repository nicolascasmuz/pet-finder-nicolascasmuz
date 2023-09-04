import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

export class PetReport extends Model {}

PetReport.init(
  {
    picURL: DataTypes.STRING,
    name: DataTypes.STRING,
    details: DataTypes.STRING,
    found: DataTypes.BOOLEAN,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  },
  { sequelize, modelName: "petreport" }
);
