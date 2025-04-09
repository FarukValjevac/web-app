# Project Name

People manager web app that is able to add\remove people in a table and save them in PostgreSQL. This is just a proof of concept for my job interview at PKE Holding.

## Tech Stack

### Backend

- **Technology**: C# with **ASP.NET Core**
  - The backend is built using **C#** and **ASP.NET Core**, providing a RESTful API that handles all server-side logic.

### Frontend

- **Technology**: **Angular**
  - The frontend is developed using **Angular**, a powerful TypeScript-based framework for building single-page applications.
  - It communicates with the backend API to display dynamic data and provide an interactive user experience.

### Database

- **Database**: **PostgreSQL**
  - PostgreSQL is used as the relational database for persisting data.
  - The project uses a PostgreSQL database named **web-app-DB** (or your custom database name), which stores and retrieves application data.

## Installation

### Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (for Angular frontend)
- **.NET SDK** (for C# backend development)
- **PostgreSQL** (for database)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/FarukValjevac/web-app.git
   cd web-app
   ```

2. Navigate to the backend project folder:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   dotnet restore
   ```

4. Run the backend project:

   ```bash
   dotnet run
   ```

   This starts the backend API on `http://localhost:3005`.

### Frontend Setup

1. Navigate to the frontend project folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the frontend project:

   ```bash
   ng serve
   ```

   This starts the Angular frontend on `http://localhost:4200`.

### Database Setup

1. Install **PostgreSQL** on your system if you haven't already.

2. Create the database (if it hasn't been created already):

   ```bash
   psql -U postgres
   CREATE DATABASE web-app-DB;
   ```

3. Run the database migrations from the backend to set up the tables:

   ```bash
   dotnet ef database update
   ```

4. If you need to interact with the database, use the PostgreSQL command line (`psql`) or any other database client like **pgAdmin**.

## Usage

1. Navigate to `http://localhost:4200` for the frontend.
2. The frontend will make requests to the backend API to fetch data from the database.
