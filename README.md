# Exercise Tracker
This project is a full-stack MERN app that can be used to track exercise activities completed by the user. The app contains four basic functionalities: create, read, update, and delete (CRUD). The app can be viewed and interacted with in the browser while database management is through MongoDB.

## About the Stack
The frontend of the app was built using React.JS. The backend was built using Node.JS, Express, MongoDB, and Mongoose. 

## Getting Started
To run the app on a local machine, follow the steps below to install the correct packages and files.

* Clone the repo.
* Install npm packages for server side. Specify port number to run the Express server and establish connection to MongoDB.
    * In the command line, type:
        ```
        cd server
        npm install
        touch .env
        ```
    * Navigate to the .env file and paste the following. Replace string with your database.
        ```
        MONGODB_CONNECT_STRING='<paste string here>'
        PORT=3000
        ```
* Install npm packages for client side. Specify port number to run React app.
    * In the command line, type:
        ```
        cd client
        npm install
        touch .env
        ```
    * Navigate to the .env file and paste the following.
        ```
        PORT=8000
        ```
* Start project on local host. 
    * In the command line, type:
        ```
        npm start
        ```