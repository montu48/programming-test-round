# Programming Test Round

## Overview
This repository contains the solution for the programming test round. It is an inventory management system built using Node.js, Express, and Prisma with PostgreSQL as the database. The system allows users to manage products and categories, including functionalities for user authentication.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to build APIs.
- **Prisma**: ORM for database management.
- **PostgreSQL**: Relational database for storing data.
- **JWT**: For user authentication.
- **Jest**: Testing framework for unit and integration tests.
- **Swagger**: For API documentation.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/programming-test-round.git
   cd programming-test-round
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME
   JWT_SECRET=your_jwt_secret
   ```
   Replace `USER`, `PASSWORD`, and `DATABASE_NAME` with your PostgreSQL credentials.

4. **Set Up the Database**
   - Ensure PostgreSQL is running.
   - Run the following commands to set up the database schema:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

## Running the Application

1. **Start the Server**
   ```bash
   npm run start
   ```
   The server will run on `http://localhost:4000`.

2. **Access the API Documentation**
   Open your browser and navigate to `http://localhost:4000/api-docs` to view the Swagger UI for API documentation.

## API Documentation
The API provides endpoints for user authentication, product management, and category management. You can find detailed API documentation in the Swagger UI.

### Key Endpoints
- **Authentication**
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Login a user.

- **Products**
  - `POST /products`: Create a new product.
  - `GET /products`: Retrieve all products.
  - `GET /products/:id`: Retrieve a product by ID.
  - `PUT /products/:id`: Update a product.
  - `DELETE /products/:id`: Delete a product.

- **Categories**
  - `POST /categories`: Create a new category.
  - `GET /categories`: Retrieve all categories.
  - `GET /categories/:id`: Retrieve a category by ID.
  - `PUT /categories/:id`: Update a category.
  - `DELETE /categories/:id`: Delete a category.

## Testing
To run the tests, use the following command:
```bash
npm test
```
This will execute all the test cases defined in the `tests` directory.
