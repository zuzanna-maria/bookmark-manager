# Bookmark Manager

***To run project ***

```sh
$ npm install
$ npx sequelize-cli db:create
$ npx sequelize-cli db:migrate
$ npx nodemon app.js
```

### Databases
```sh
$ npx sequelize-cli db:create
$ npx sequelize-cli db:migrate

$ NODE_ENV=test npx sequelize-cli db:create
$ NODE_ENV=test npx sequelize-cli db:migrate
```

### Run tests
```sh
$ NODE_ENV=test npx nodemon app.js
$ NODE_ENV=test npx cypress open
```
