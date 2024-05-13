# Real-time Data Visualization Project

## Overview

This project, named **Real-time-data-visualization**, is aimed at visualizing real-time sensor data using various technologies such as Express.js, SQLite3, Chart.js, React, Node.js, and Axios. It involves both backend and frontend development to create a web application for displaying sensor data in a visually appealing manner.

## Backend Development (Node.js)

### Express.js Application

The backend of the project is developed using Express.js, a popular web framework for Node.js. It provides a robust set of features for building web applications and APIs.

#### Endpoints Implementation

The Express application implements endpoints for sensor data ingestion (POST), retrieval (GET), delete ,chartdata. These endpoints handle requests from the frontend application and interact with the SQLite database to perform CRUD operations on sensor data.

### SQLite Database

The project utilizes a SQLite database to store sensor data efficiently. A well-designed schema is implemented to facilitate the storage and retrieval of sensor readings.

#### Schema Design

The database schema is designed to efficiently store and retrieve sensor readings. It ensures optimal performance and scalability for handling large volumes of sensor data.

## Sensor Data Population

To simulate sensor data, a script or function is created to generate random sensor readings at regular intervals. This script/function periodically generates new sensor readings and stores them in the SQLite database.

### Script Functionality

- Simulates data for three temperature sensors.
- Generates random sensor readings at regular intervals.
- Stores the generated sensor readings in the SQLite database.

## Running the Project

To run the project:

1. Navigate to the **server** folder in your terminal.
2. Run `npm install` to install dependencies.
3. Start the backend server by running `npm start`.
4. Navigate to the **client** folder in another terminal window.
5. Run `npm install` to install dependencies for the frontend.
6. Start the frontend development server by running `npm run dev`.

## Technologies Used

- Express.js
- SQLite3
- Chart.js
- React
- Node.js
- Axios

## Contributors

- [Trithanka Baruah]


## License

This project is licensed under the [MIT License](LICENSE).