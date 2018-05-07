# Inventory Manager

<!-- * [Demo](heroku)
 -->
Manage your restaurant inventory to reduce waste, calculate profit, and forecast.

### Why build this app?
* To create an app that handles both relational and nonrelational database.
* To run a streamline process that will complete number of tasks with single confirmation.
* To add pass single AJAX call from front-end and let the complexity occurs in server-end when trying to do multiple AJAX calls from front-end.
* To have all methods in App.js and all component as functional stateless component only.

### Update Features Planned
* Incorporating Redux for state management.
* Add OAuth to separate manager and employee, manager account have access to all features while employee should only access the Sales.
* Order processing screen to the kitchen  

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
* Go back to root folder
```
cd ..
```

### How to setup Express server
* Create .env in project root and setup following:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=name of your database
```

### How to start local environment
* Start local server
```
npm run start
```
* Start local front-end
```
npm run dev
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

## Built With

* [Reactstrap](https://reactstrap.github.io/) - React Bootstrap components.
* [React Chart.js](https://github.com/reactjs/react-chartjs) - For charts.
* [Axios](https://www.npmjs.com/package/axios) - API Calls.
* [Express](https://expressjs.com/) - NodeJS library.
* [create-react-app](https://github.com/facebook/create-react-app) - React Starter Pack.
* [Heroku](https://devcenter.heroku.com/) - Deployment platform and documentations

## Authors

* **Carson Chen** (https://github.com/carsoncychen)
* **Nian Liu** (https://github.com/nianliu18)
