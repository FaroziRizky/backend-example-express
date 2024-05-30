# Backend With Express.JS
This repository contains backend services for learning. Express.js as a framework for backend development and MySQL as a database management system.
**Fast, unopinionated, minimalist web framework for [Node.js](http://nodejs.org).**

[![N|Solid](https://www.appsyoda.com/blogimages/expressjs-nodejs.png)](https://nodesource.com/products/nsolid)


## Table of contents

* [Tech](#tech)
* [Environment Variables](#Environment-Variables)
* [Installation](#Installation)
* [Authors](#Authors)
* [License](#license)


## Tech

- [Node.JS](https://nodejs.org/en) - A runtime environment that allows you to run JavaScript on the server side, enabling the development of scalable and high-performance network applications.
- [Express.JS](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.
- [JSON Web Token](https://jwt.io/) - A compact URL-safe token used for securely transmitting information between parties as a JSON object.
- [Sequelize](https://sequelize.org/) - ORM (Object-Relational Mapping) library for Node.js that simplifies database interactions by mapping database tables to JavaScript objects and providing methods for querying and manipulating data.
- [Fastest-validator](https://www.npmjs.com/package/fastest-validator/) - A lightweight and efficient validation library for Node.js and browsers, designed to validate data against predefined schemas with minimal overhead.
- [MySQL2](https://www.npmjs.com/package/mysql2/) - A fast and efficient MySQL client for Node.js, providing an easy-to-use interface for interacting with MySQL databases asynchronously.
- [Bcrypt](https://www.npmjs.com/package/bcrypt/) - A Node.js library used for hashing passwords and enhancing security by providing a secure and efficient method for password encryption.

## Environment Variables

To run this project, you need to add the following environment variables to your .env file:

- ### The port where you run
  - `PORT` = 5000
 

- ### Development 
  - `DB_USERNAME` = _your development username_
  - `DB_PASSWORD` = _your development password_
  - `DB_HOSTNAME` = _your development hostname_
  - `DB_NAME` = _your development database name_
  - `DB_DIALECT` = _your development dialect_


- ### Test 
  - `DB_USERNAME_TEST` = _your test username_
  - `DB_PASSWORD_TEST` = _your test password_
  - `DB_HOSTNAME_TEST` = _your test hostname_
  - `DB_NAME_TEST` = _your test database name_
  - `DB_DIALECT_TEST` = _your test dialect_


- ### Production 
  - `DB_USERNAME_PRODUCTION` = _your production username_
  - `DB_PASSWORD_PRODUCTION` = _your production password_
  - `DB_HOSTNAME_PRODUCTION` = _your production hostname_
  - `DB_NAME_PRODUCTION` = _your production database name_
  - `DB_DIALECT_PRODUCTION` = _your production dialect_

- ### database selection
  - `NODE_ENV` = _adjust it to where you run the database (development, test or production)_


- ### JWT Configuration
  - `ACCESS_TOKEN_SECRET` = _secret key for access token_
  - `REFRESH_TOKEN_SECRET` = _secret key for refresh token_
  
## Installation

- Clone this project:

    Clone this repository into your local system

```bash
    git clone https://github.com/FaroziRizky/backend-example-express.git
```

- Installing packages:

    Run the npm install command to install all necessary dependencies.

```bash
    npm install
```

- Environment Configuration:

    Change the .env.example file to .env and customize it with your environment configuration, including database information and other settings.

- Make sure MySQL is turned on in XAMPP control center.

- Run migrate sequelize
```bash
    npx sequelize db:migrate
```

- API Access:

Access the API through the endpoints specified in the documentation.

- Run your project with:

```bash
  npm start
```

- Enjoy your programs!

## Authors

- Github: [@FaroziRizky](https://github.com/FaroziRizky)

## License

MIT

This project is licensed under the MIT license - see the [LICENSE](LICENSE) file for more details.
