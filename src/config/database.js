import { Sequelize } from 'sequelize';
import { db } from './env.config.js';

const sequelize = new Sequelize(db.name, db.user, db.pass, {
    host: db.host,
    dialect: 'mysql',
    port: db.port,
    // Comment if you work at localhost
    dialectOptions: {
        ssl: {
            require: false,
            rejectUnauthorized: false,
        },
    },
});

export default sequelize;
