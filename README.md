# News

Rest service for saving and retrieving news. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
- Node: v8.11.3 or higher - [Node](https://nodejs.org/en/)
- OS: linux x64
- MongoDB: v3.6.3 or higher
```

### Installing

A step by step series of examples that tell you how to get a development env running

- Go to the root folder of the project
- In the terminal run "npm install" to install node_modules
- In the terminal run "npm start"  => to start nodejs server on port: 3000

### Running the tests
- Run "npm run test" in the terminal
- You should see all test pass

### And coding style tests
        Eslint to enforce "airbnb-base" coding style

### Folder Structure

        .
        ├── api
        │   ├── index.js
        │   └── v1.0.js
        ├── app.js
        ├── config
        │   ├── development.js
        │   ├── index.js
        │   └── test.js
        ├── dbConnection
        │   └── index.js
        ├── development.env
        ├── middlewares
        │   ├── index.js
        │   └── responses.js
        ├── package.json
        ├── package-lock.json
        ├── README.md
        ├── src
        │   ├── controllers
        │   │   └── v1.0
        │   ├── repositories
        │   │   └── news
        │   └── validators
        │       ├── index.js
        │       └── v1.0
        ├── test
        │   └── integration
        │       └── news.test.js
        └── test.env

## Authors

* **Wesam Mustafa** - *Initial work* - [Wesam Mustafa](https://github.com/wesammustafa)

## License

This project is licensed under the MIT License