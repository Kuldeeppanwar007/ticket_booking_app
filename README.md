# Nodejs Expressjs postres Ready-to-use API Project Structure

## Getting started

This is a basic API skeleton written in JavaScript. Very useful to building a RESTful web APIs for your front-end platforms like Android, iOS or JavaScript frameworks (Angular, Reactjs, etc).

This project will run on **NodeJs** using **postgres** as database. I had tried to maintain the code structure easy can also adopt the flow and start building an API.

## Software Requirements

- Node.js
- postgres

## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "ticket_booking_app" to your project name.

```bash
https://github.com/Kuldeeppanwar007/ticket_booking_app.git ./ticket_booking_app
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd ticket_booking_app
npm install
```
## swagger document
```bash
http://localhost:5000/api-doc/
```

## Project structure

```sh
.
├── index.js
├── package.json
├── .env
└── src
    ├── controllers
    |   ├── screen.controler.js
    |   ├── timeSlots.controler.js
    |   └── ticket.controler.js
    |
    ├── db
    |   └── connToDb.js
    |
    ├── logger
    |   ├── dev-logger.js
    |   ├── index.js
    |   └── prod-logger.js
    |
    ├── models
    |   ├── init-models.js
    |   ├── screens.js
    |   ├── tickets.js
    |   └── timeslots.js
    |
    └── routes
        ├── Router.js.js
        ├── screens.routes.js
        ├── tickets.routes.js
        └── timeSlots.routes.js
    
```

## How to run

### Running API server locally

```bash
npm start || nodemon app
```

You will know server is running by checking the output of the command `npm start`

```bash
app listening at http://localhost:5000
Connection has been established successfully.

Press CTRL + C to stop the process.
```

### Creating new models

If you need to add more models to the project just create a new file in `src/models/` and use them in the controllers.

### Creating new routes

If you need to add more routes to the project just create a new file in `src/routes/`, it will be loaded dynamically.

### Creating new controllers

If you need to add more controllers to the project just create a new file in `src/controllers/` and use them in the routes.

You can set custom command for test at `package.json` file inside `scripts` property.

