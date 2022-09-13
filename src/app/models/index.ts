import {Sequelize} from 'sequelize';
import {config} from '../config/db.config'

export const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
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
)