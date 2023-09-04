import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

export class User extends Model {}

User.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);
