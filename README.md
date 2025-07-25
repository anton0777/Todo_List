# Todo List

## Description

A simple todo-list application.

### Features:

* Node provides the backend environment for this application
* Express middleware is used to handle requests, routes
* Prisma ORM connects to a MySQL database and provides schema modeling
* MySQL is used as the database
* Vite + React + Tailwind CSS are used for the frontend

---

## Docker Guide

To run this project locally you can use docker compose provided in the repository. Here is a guide on how to run this project locally using docker compose.

Clone the repository
```
git clone https://github.com/anton0777/Todo_List.git
```
Then simply start the docker compose:

```
docker compose up -d
```

---

 ## Backend Setup

`npm install` in the project root will install dependencies.

Generate a Prisma client based on the schema (schema.prisma) and migrate:
```
npx prisma generate
npx prisma migrate dev
```
Start development server:
```
npm run dev
```

---

## Frontend Setup

The frontend is located in the `client` folder.

To start the frontend locally:
```
cd client
npm install
npm run dev
```