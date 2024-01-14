 # CRUD API

 # .env -- Contains
PORT = 6000
PORTS=3001



This is a simple CRUD (Create, Read, Update, Delete) API implemented in Node.js using Express. It uses a simple in-memory database for storing data.

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Usage

To start the API in development mode, run the following command:

```bash
npm run start:dev
```

This will start the API on port 3000.

To start the API in production mode, run the following command:

```bash
npm run start:prod
```

This will build the TypeScript code and then start the API on port 3000.

## API Endpoints

The API provides the following endpoints:

* `/api/todos`: This endpoint allows you to create, read, update, and delete todos.
* `/api/todos/:id`: This endpoint allows you to get a single todo by its ID.

## Code Overview

The API is implemented using the Express framework. The `app.js` file is the entry point of the API. It imports the necessary modules and configures the Express application.

The `todos.js` file contains the logic for the CRUD operations on todos. It uses a simple in-memory database for storing data.

The `todo.model.js` file defines the schema for a todo.

## Example

To create a new todo, send a POST request to the `/api/todos` endpoint with the following JSON payload:

```json
{
  "title": "My first todo",
  "description": "This is my first todo."
}
```

The API will respond with the newly created todo:

```json
{
  "id": "1",
  "title": "My first todo",
  "description": "This is my first todo."
}
```

To get all todos, send a GET request to the `/api/todos` endpoint. The API will respond with an array of all todos:

```json
[
  {
    "id": "1",
    "title": "My first todo",
    "description": "This is my first todo."
  }
]
```

To get a single todo by its ID, send a GET request to the `/api/todos/:id` endpoint. The API will respond with the todo with the specified