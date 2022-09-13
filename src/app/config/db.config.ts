import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    development : {
        username : process.env.DB_USERNAME || 'root',
        password : process.env.DB_PASSWORD || '123',
        database : process.env.DB_DBNAME || 'test',
        host : process.env.HOST || 'localhost',
        port : process.env.PORT || 3306,
        dialect : "mysql2"
    }
}