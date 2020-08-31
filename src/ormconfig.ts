import * as path from 'path';
import {ConnectionOptions} from 'typeorm';

require('dotenv').config();

export const config: ConnectionOptions = {
    type: 'mongodb',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities: [path.join(__dirname, "**/*.entity{.ts,.js}")],
    logging: true,
    synchronize: true,
    migrationsRun: true,
    migrations: [path.join(__dirname + '/migrations/**/*{.ts,.js}')],
    cli: {
      migrationsDir: 'src/migrations',
    },
};

