# Resource Wall

## About

Pinterest for learners.

Allow learners to save learning resources like tutorials, blogs and videos in a central place that is publicly available to any user.



## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies: `npm i`
3. Start the web server using the npm run local command. The app will be served at http://localhost:8080/.
4. Go to http://localhost:8080/ in your browser.
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`



## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- body-parser
- cookie-session
- dotenv
- ejs
- express
- knex
- knex-logger
- morgan
- node-sass-middleware
- pg


## Screenshots

![Add a Resource](https://github.com/gregmorihovitis/resourceMidterm/blob/master/public/images/resource-gif.gif?raw=true)
