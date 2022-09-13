import * as dotenv from 'dotenv';
import resources from '../../../init/resource.seeding.json';

dotenv.config();

export const config = {
    development : {
        username : process.env.DB_USERNAME || 'root',
        password : process.env.DB_PASSWORD || '123',
        database : process.env.DB_DBNAME || 'test',
        host : process.env.HOST || 'localhost',
        port : 3307,
        dialect : "mysql"
    },
    initialRecord: {
        resources
    }
}