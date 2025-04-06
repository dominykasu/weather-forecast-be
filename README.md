# Weather Forecast Web Application

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![React Bootstrap](https://img.shields.io/badge/React_Bootstrap-0D6EFD?style=for-the-badge&logo=react-bootstrap&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

A web application to display weather forecasts for selected cities, while logging user actions in the backend.

## 1. Introduction

This application provides a user-friendly interface to view current weather conditions and a 5-day forecast for a chosen city. It features a searchable dropdown for city selection, displays the most recently viewed cities for quick access, and logs user interactions (city selections) in a backend Node.js application that persists data to a PostgreSQL database. The front-end is built with React and styled using React Bootstrap and custom SCSS. Weather data is fetched from the OpenWeatherMap API.

## 2. Functional Requirements

### 2.1. Front-end

1.  **Responsive Layout:** The application layout adapts to various screen sizes, ensuring a consistent experience on desktops, tablets, and mobile devices.
2.  **Searchable Dropdown:** Users can search for and select a city from a dropdown menu to view its weather forecast. This is implemented using the `react-select` library.
3.  **Mostly Viewed Cities (Browser Storage):** The browser's `localStorage` stores the last 3 unique cities the user has viewed, ordered by the most recent view.
4.  **Mostly Viewed Cities (Display & Suggestion):** The top 3 mostly viewed cities are displayed as clickable elements, allowing users to quickly select them.
5.  **Current Weather Conditions:** Upon selecting a city, the current weather conditions are displayed, including the city name, weather icon, temperature (in Celsius), wind speed (in m/s), and humidity (in %).
6.  **5-Day Forecast:** A 5-day weather forecast is presented, showing one forecast entry per day. Each day's forecast includes the day of the week, weather icon, temperature, wind speed, and humidity. A line chart visualizing the temperature trend over the 5 days is also displayed.

### 2.2. Back-end

1.  **User Action Logging (Console):** The Node.js backend logs each selected city and the timestamp of the selection to the console.
2.  **User Action Logging (Database):** The backend persists each selected city and its timestamp into a PostgreSQL database for tracking user activity.

## 3. Technical Requirements

1.  **Front-end:** React
2.  **Back-end:** Node.js
3.  **UI Library:** React Bootstrap
4.  **Searchable Dropdown:** `react-select`
5.  **Charting Library:** `recharts`
6.  **HTTP Client:** `axios`
7.  **Custom Styling:** SCSS
8.  **Database:** PostgreSQL
9.  **Database Driver (Node.js):** `pg`
10. **Environment Variables:** `dotenv`
11. **CORS:** `cors`
12. **Web Framework (Node.js):** `express`
13. **Source Code Hosting:** GitHub
14. **API for Weather Data:** OpenWeatherMap ([https://openweathermap.org/](https://openweathermap.org/))

## 4. Project Architecture

The application follows a client-server architecture.

### 4.1. Front-end (React)

The React front-end handles user interaction, fetches data from the OpenWeatherMap API and the backend API, manages the UI state, and renders the weather information. Key components include:

* `WeatherForecast`: The main container component that orchestrates data fetching, state management, and rendering of weather information and forecast.
* `DailyForecastCard`: Renders the weather details for a single day in the 5-day forecast.
* `react-select`: Provides the interactive and searchable city selection dropdown.
* `recharts`: Used to display a responsive line chart visualizing the temperature forecast over the next five days.

The front-end uses `localStorage` to store and retrieve the list of mostly viewed cities, enhancing user experience by providing quick access to previously viewed locations.

### 4.2. Back-end (Node.js)

The Node.js backend is responsible for logging user actions and interacting with the PostgreSQL database. Built using Express.js, it provides a simple API endpoint for the front-end to send city selection events.

* **API Endpoint (`/api/log`):** Accepts POST requests with the selected city name and logs this information to both the console and the PostgreSQL database.
* **Database Interaction:** Uses the `pg` library to execute SQL queries for inserting log entries into the `logs` table.
* **Configuration:** Database connection details are managed through environment variables using the `dotenv` package.
* **CORS:** Enabled using the `cors` middleware to allow requests from the front-end running on a different origin.

### 4.3. Database (PostgreSQL)

PostgreSQL is used as the persistent storage for logging user actions. The `logs` table stores each city selection event with a timestamp.

* **`logs` Table:**
    * `id` (SERIAL PRIMARY KEY): Unique identifier for each log entry.
    * `city` (VARCHAR(255) NOT NULL): The name of the selected city.
    * `timestamp` (TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()): The date and time when the city was selected.

## 5. Setup Instructions

### 5.1. Prerequisites

* [Node.js](https://nodejs.org/) (LTS recommended) and npm (or [yarn](https://yarnpkg.com/)) installed.
* [PostgreSQL](https://www.postgresql.org/) installed and running.
* [OpenWeatherMap API key](https://openweathermap.org/appid). Sign up for a free account to obtain one.

### 5.2. Back-end Setup

1.  **Clone the GitHub repository:**
    ```bash
    git clone [YOUR_GITHUB_REPOSITORY_URL_HERE]
    cd weather-forecast-app/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Create `.env` file:** Create a `.env` file in the `backend` directory and configure your PostgreSQL database connection:
    ```
    PG_HOST=your_postgres_host
    PG_PORT=your_postgres_port
    PG_USER=your_postgres_user
    PG_PASSWORD=your_postgres_password
    PG_DATABASE=weather_forecast_db
    ```
    Replace the placeholders with your actual PostgreSQL credentials.
4.  **Run the backend application:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The server will start on the port defined in `backend/server.js` (likely `5432`).

### 5.3. Front-end Setup

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Create `.env.local` file:** Create a `.env.local` file in the `frontend` directory and add your OpenWeatherMap API key:
    ```
    REACT_APP_OPENWEATHERMAPP_API_KEY=your_openweathermap_api_key
    ```
    Replace `your_openweathermap_api_key` with your actual API key.
4.  **Run the front-end application:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The React development server will start, usually accessible at `http://localhost:3000`.

### 5.4. Database Setup (PostgreSQL)

1.  **Connect to PostgreSQL:** Use a PostgreSQL client (e.g., `psql`, pgAdmin).
2.  **Create the database:**
    ```sql
    CREATE DATABASE weather_forecast_db;
    ```
3.  **Connect to the database:**
    ```sql
    \c weather_forecast_db;
    ```
4.  **Create the `logs` table:**
    ```sql
    CREATE TABLE logs (
        id SERIAL PRIMARY KEY,
        city VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    ```

## 6. API Endpoints

### 6.1. OpenWeatherMap API (External)

* `GET https://api.openweathermap.org/data/2.5/find?lat=40.7128&lon=-74.0060&cnt=50&appid={YOUR_API_KEY}`: Fetches a list of potential city options.
* `GET https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={YOUR_API_KEY}&units=metric`: Retrieves current weather data for a specified city.
* `GET https://api.openweathermap.org/data/2.5/forecast?q={city_name}&appid={YOUR_API_KEY}&units=metric`: Retrieves 5-day weather forecast data for a specified city.

### 6.2. Backend API (Internal)

* `POST http://localhost:5432/api/log`: Logs the selected city to the console and the PostgreSQL database.
    * **Request Body:**
        ```json
        {
            "city": "City Name"
        }
        ```
    * **Response Codes:**
        * `201 Created`: Successfully logged.
        * `400 Bad Request`: Missing `city` in the request.
        * `500 Internal Server Error`: Error during logging.

## 7. UI Libraries and Styling

* **React Bootstrap:** Provides responsive layout and basic UI components.
* **`react-select`:** Enables a searchable and user-friendly dropdown for city selection.
* **`recharts`:** Used for creating the temperature line chart in the forecast section.
* **SCSS:** Custom styles are applied using SCSS files (`./styles.scss` in the front-end) to enhance the visual appearance and layout beyond the default Bootstrap styles.

## 8. GitHub Repository

* https://github.com/dominykasu/weather-forecast-fe
* https://github.com/dominykasu/weather-forecast-be

## 9. Documentation

This `README.md` file serves as the primary documentation for the Weather Forecast web application. Code-level details and explanations can be found as comments within the source code.

## 10. Potential Improvements

* Display more detailed forecast information (min/max temperature, weather description, etc.).
* Implement location-based initial city suggestions.
* Enhance error handling for API requests and user interactions.
* Improve the visual design and overall user experience.
* Add backend API endpoints for retrieving and displaying logged user actions.
* Implement more sophisticated logic for tracking and displaying "most viewed" cities, potentially on the backend.
* Write comprehensive unit and integration tests for both the front-end and back-end.