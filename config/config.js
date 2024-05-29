require('dotenv').config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_NAME,
  DB_DIALECT
}=process.env;

const {
  DB_USERNAME_TEST,
  DB_PASSWORD_TEST,
  DB_HOSTNAME_TEST,
  DB_NAME_TEST,
  DB_DIALECT_TEST
}=process.env;


const {
  DB_USERNAME_PRODUCTION,
  DB_PASSWORD_PRODUCTION,
  DB_HOSTNAME_PRODUCTION,
  DB_NAME_PRODUCTION,
  DB_DIALECT_PRODUCTION
}=process.env;

module.exports={
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": DB_DIALECT
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": DB_DIALECT
  },
  "production": {
    "username": DB_USERNAME_PRODUCTION,
    "password": DB_PASSWORD_PRODUCTION,
    "database": DB_NAME_PRODUCTION,
    "host": DB_HOSTNAME_PRODUCTION,
    "dialect": DB_DIALECT_PRODUCTION
  }
}
