import ResourceModel from './models/resource';

import {Sequelize} from 'sequelize';
import {config} from './config/db.config'

export const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        port: config.development.port,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            options: {
                requestTimeout: 3000
            }
        },
    }
);

sequelize.authenticate();

sequelize.getQueryInterface().createDatabase("test")
    .then(() => {
        console.log("create success")
    })
    .catch((e) => {
        console.log("error create database")
    })

const DB = {
    Resource: ResourceModel(sequelize),
    sequelize,
}

export default DB;