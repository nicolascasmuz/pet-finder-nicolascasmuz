"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Profile extends sequelize_1.Model {
}
exports.Profile = Profile;
Profile.init({
    picURL: sequelize_1.DataTypes.STRING,
    nickname: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
    address: sequelize_1.DataTypes.STRING,
    location: sequelize_1.DataTypes.STRING,
    lat: sequelize_1.DataTypes.FLOAT,
    lng: sequelize_1.DataTypes.FLOAT,
}, { sequelize: index_1.sequelize, modelName: "profile" });
