# Tutorial for Express and React with Heroku Deployment.

## Starter pack for Express backend with React frontend using create-react-app, and deploy to Heroku with postgresql database.

## Technologies
* [Axios](https://www.npmjs.com/package/axios) - API Calls.
* [Express](https://expressjs.com/) - NodeJS library.
* [create-react-app](https://github.com/facebook/create-react-app) - React Starter Pack.
* [Heroku](https://devcenter.heroku.com/) - Deployment platform and documentations

### Starter included testing route

### How to get start
* Make sure got NodeJS and npm installed
* Clone this repo
* Create new project directory
* Copy and paste everything in this repo into new project directory
* Open package.json and change "name" to your project name and run following commend to install Express server dependencies:
```
npm i
```
* Then run following commend to install React dependencies:
```
cd client 
```
```
npm i
```

### How to setup Express server
* Create .env and setup following:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=name of your database
```

### How to start local environment
* Start local server
```
npm run dev
```
* Start local front-end
```
npm run start
```

### How to deploy to Heroku with Git
* Make sure [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) is installed. 
* Run
```
heroku create
```
```
git push heroku master
```
* If on non-master branch, then run:
```
git push heroku branchname:master
```
* Check [this guide](https://devcenter.heroku.com/articles/git) for more details.

### How to add Postgresql to Heroku
* Follow steps in "How to deploy heroku"
* Run following to install Postgresql addons with free price tier:
```
heroku addons:create heroku-postgresql:hobby-dev
```
* Database on Heroku is defaulted to DATABASE.
* Run following to push local database into Heroku Postgresql
```
heroku pg:push localdatabase DATABASE/HEROKU_DATABASE_NAME
```
* Check [this guide](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup) for more details.


