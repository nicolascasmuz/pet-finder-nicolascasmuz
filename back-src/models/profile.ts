import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

export class Profile extends Model {}

Profile.init(
  {
    picURL: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    location: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  },
  { sequelize, modelName: "profile" }
);
