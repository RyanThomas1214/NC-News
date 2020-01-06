# NC-News API

This repository is the Backend of a 'Reddit-like' application called NC-News. This application allows users to post and read articles on various topics as well as posting comments. This application also has a voting system on both the articles and comments.

## Initialisation

Clone this repo:

```bash
git clone https://github.com/RyanThomas1214/be-nc-news.git

cd be-nc-news
```

Once opened, you should install the dev dependencies using the following command:

```bash
npm i
```

## Making requests locally

After initialisation, you can setup the database in the dev environment by using the commands:

```bash
npm run setup-dbs

npm run seed
```

Once the seed file has run you can then start the server by using the command:

```bash
npm start
```

When the server is up and running you are able to send the API test requests by using programs such as Insomnia. A list of available endpoints can be viewed in your browser on the endpoint:

[http://localhost:9090/api](http://localhost:9090/api)

## Running the tests

Once the repository is installed and setup you can run test for all the API endpoints using the command:

```bash
npm test
```

Along with tests for all tha API endpoints you can also test the util functions this repository uses by entering the command:

```bash
npm test-utils
```

## Built With

- [Express](https://expressjs.com/ "Express") - Node web application framework.

* [Knex](http://knexjs.org/ "Knex") - A SQL query builder.

* [node-postgres](https://node-postgres.com/ "node-postgres") - Modules for interfacing with PostgreSQL databases.

## Authors

**Ryan Thomas**

GitHub - [RyanThomas1214](https://github.com/RyanThomas1214 "RyanThomas1214")

## Hosted Site

Hosted using netlify

[NC-News](https://youthful-bell-236ead.netlify.com/ "NC-News")

## Frontend Repository

[fe-nc-news](https://github.com/RyanThomas1214/fe-nc-news "fe-nc-news")
