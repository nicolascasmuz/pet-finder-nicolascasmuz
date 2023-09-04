"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetReport = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class PetReport extends sequelize_1.Model {
}
exports.PetReport = PetReport;
PetReport.init({
    picURL: sequelize_1.DataTypes.STRING,
    name: sequelize_1.DataTypes.STRING,
    details: sequelize_1.DataTypes.STRING,
    found: sequelize_1.DataTypes.BOOLEAN,
    lat: sequelize_1.DataTypes.FLOAT,
    lng: sequelize_1.DataTypes.FLOAT,
}, { sequelize: index_1.sequelize, modelName: "petreport" });
