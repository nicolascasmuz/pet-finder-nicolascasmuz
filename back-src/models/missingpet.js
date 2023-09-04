"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingPet = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class MissingPet extends sequelize_1.Model {
}
exports.MissingPet = MissingPet;
MissingPet.init({
    picURL: sequelize_1.DataTypes.STRING,
    name: sequelize_1.DataTypes.STRING,
    details: sequelize_1.DataTypes.STRING,
    found: sequelize_1.DataTypes.BOOLEAN,
    lat: sequelize_1.DataTypes.FLOAT,
    lng: sequelize_1.DataTypes.FLOAT,
    ownerEmail: sequelize_1.DataTypes.STRING,
    ownerName: sequelize_1.DataTypes.STRING,
}, { sequelize: index_1.sequelize, modelName: "missingpet" });
