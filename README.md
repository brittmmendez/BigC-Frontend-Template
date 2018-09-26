This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and utilizes [Mobx-State-Tree](https://github.com/mobxjs/mobx-state-tree) for state management.


## Table of Contents

- [Folder Structure](#folder-structure)
- [API Reference](#api-reference)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
- [Setup](#setup)
- [Fetching Requests](#fetching-requests)
- [Components](#components)
- [Containers and Routes](containers-and-routes)
- [Using CSS](#using-css)
- [Questions? Feedback? Contribute?](#contribute)


## Folder Structure

After creation, your project should look like this:

```
my-app/
  config/
  node_modules/
  public/
  scripts/
  src/
    components/
    containers/
    models/
    static/
    index.js
  tests/
    e2e/
    unit/
  .eslintrc
  cypress.json
  package.json  
  README.md
  tsconfig.json
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files and supporting files.

## API Reference
An example set of API reference docs can be viewed on Swagger: 
[My Mix API Reference Docs](https://my-mix-api.herokuapp.com/api-docs/)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console/broswer.

### `npm test`

Launches [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-Nutshell) end-to-end tests.


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## Setup
Once you have set up a BigCommerce store and the accompanying BigCommerce API Template, fork this repo and rename it to be specific to your project.  

You should be able to make one small change to the apiUrl and instantly have a working React app with basic functionality that can be built on to fit your custom project’s needs. 

### `Getting Started`
1. Navigate to src/mondels/shop.js.
2. Change the current model attribut 'apiUrl' to your custom BigCommerce API url. 
3. run npm start to see the basic app function with your API
4. run npm test to run cypress end-to-end tests to quickly confirm all areas of app are functioning.

## Fetch Requests
Asynchronous actions in Mobx-State-Tree are written by using generators and always return a promise. Currently, there are four fetch requests using generators in this app.

#### `src/models/shop.js`
1. getProducts() - uses apiUrl/orders to make get all products from BigCommerce API immediately after an instance is created.
2. proccessOrder() - uses apiUrl/orders to make a post request to send an order to BigCommerce API.
#### `src/models/user.js`
3. logIn() - uses apiUrl/login to make a post request
4. register() - uses apiUrl/register to make a post request

## Components
#### `Adding`
You can create as many components as you would like in the components folder.

#### `Removing`
Delete the file and be sure to remove the import in any other files that referenced it. 

## Containers and Routes
#### `Adding`
Create the container in the containers folder, be sure to import the container into /src/containers/Routes.js and create the route needed.

#### `Removing`
Delete the file and be sure to remove the import in any other files that referenced it. 

## Test Coverage
Currently using [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-Nutshell) for end-to-end testing.<br/>
Navigate to tests/e2e/integration:
- home_page.spec.js
- login_spec.js
- my_cart_page.spec.js
- product_show_page.spec.js
- products_page.spec.js
- registration_spec.js

## Using CSS
This app currently uses [Bulma](https://bulma.io/documentation/).  There are no custom CSS files being used at the moment.  However, you can create your own, continue to use Bulma, or use a differen styling option of your choice. To use a different styling option, remove classNames in components and Bulma stylesheet link in index.html.

## Contribute
This template is a starting point that has a lot of room for growth as we learn more about BigCommerce and what it can do. Feel free to create a pull request or create an issue if you find a bug or have an idea on how to improve the template.


