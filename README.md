# FamPay-Backend-Challenge

### Tech Stack

- NodeJs
- ExpressJs

### Files

- `db.js : It contains code to establish connection to the dataBase`
- `main.js : It consists of an express server application which routes to different controllers and is responsible for running the application.`
- `models : It consists of definition of videos, whose shema are defined using mongoose-Schema . Attributes may be of type: String, Date, etc. Some attributes have been marked as required.`

### Local Installation

- Run `git clone https://github.com/anishagg17/FamPay-Backend-Challenge`
- `cd FamPay-Backend-Challenge`
- `npm i`
- `npm start`
- make `GET` request to `http://localhost:5000/`

Use `npm run start:dev` to watch-out for code changes and hot-reload.

Use `npm run format` to pretify the code.

Paste environment variables in `.env` file according to structure of `demo.env`.

