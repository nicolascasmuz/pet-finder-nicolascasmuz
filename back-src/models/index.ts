import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.ELEPHANTSQL_URL);
