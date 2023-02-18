# Introduction

This is the backend implementation of the "Spam Management System (SMS)".
Its corresponding frontend can be found [here](https://github.com/marcosuma/spam-management-service-frontend).
It is a very simple backend implementation that allows to mainly do two things:

- Retrieve a list of active tickets (whose related content is either active/open or removed/blocked)
- Update the status of the tickets by either **resolving** it or **blocking** its related content.

## Requirements

As explained in the [documentation task](https://github.com/morkro/coding-challenge), we have the following requirements:

- Provide a web-app UI where users can see active tickets
- Each ticket can be:
- Resolved/Closed - this means that the ticket won't be anymore visible on the platform
- Block - this means that the content to which the ticket refers will be blocked and not visible on our social media platform. **The ticket is still visible in the system and can be further resolved.**

### Technical Requirements

- The whole task must be implemented in Javascript.
- As per official documentation, _the resolving should be defined as a PUT request to an endpoint with this structure `/reports/:reportId`. An example request for how to update a report is in `data/update_ticket_request.json`_
- as a consequence this means we have to use RESTful APIs

# Tenets

- **Simplicity**: this project is simple, has basic requirements and it should be easy to understand. I should avoid overengineering stuff
- **Time to market**: for this challenge, I shouldn't spend more than three hours
- **Adaptable**: it should be fairly easy to quickly expand the report structure to a different format

# Technology stack

**The backend can be ran on Docker.**

The technology chose **for the whole project** is based on the **MERN framework**:

- Mongoose (Backend)
- Express (Backend)
- React (Frontend)
- NodeJS (Backend)

The implementation language is **JavaScript**.

## Why this technology stack

I had two main requirements: use **Javascript** and **RESTful APIs**. As a consequence I believe the MERN framework is the most ideal technology stack choice:

- it's extremely well known in the market hence easy to ramp up
- it's very intuitive, easy to use and a lot of features are available
- go-to-market is fast: with these technologies you can create a service in few hours

### What would I have chosen differently?

I would have opted for **Typescript** and **GraphQL** (with Relay support for React):

- TypeScript: it better allows static typing and it's a great alternative to Javascript as its strict syntactical superset.
- GraphQL: in the real world, GraphQL is a great alternative to RESTful APIs when it's about dealing with a lot of data being passed from backend and frontend. In this case, I can imagine that the list of reports might grow quite a lot therefore the great support that GraphQL has for **pagination** would be a great advantage.
- In addition to that: let's say that the definition of a report gets more complicated and you only need a few fields from it: with GraphQL you can avoid running multiple queries and retrieve all the data you need by using its graph query language.

# How to use

## Deploy on Docker

You should be familiar with Docker, but in case these are the commands to use:

- `cd <backend_folder>`
- `docker build -t reporting-spam-backend .`
- `docker-compose up`

The server will listen on the port `3600`.

## Call the service

As it can be seen in the `sample_queries` file, you can call the server with these two APIs:

```
curl -X GET \
 -H "Content-type: application/json" \
 -H "Accept: application/json" \
 -d '{}' \
 "http://localhost:3600/get_reports"
```

```
curl -X POST \
 -H "Content-type: application/json" \
 -H "Accept: application/json" \
 -d '{"ticketState": "CLOSED"}' \
 "http://localhost:3600/reports/07b74660-b92e-4cd9-8ec8-016bbb6d6edc"
```

As you can see, I expose **two endpoints**:

- `GET get_reports`
- `POST reports/{:reportId}`

The POST request accepts one field in input, which is `ticketState`. **Any other field will be ignored** - if you don't specify the `ticketState` field the request will return a `400 bad request message`

# Date layer

I opted for a very simplified data layer, using Mongoose (hence MongoDB).

There is only one collection which is defined by its main 4 fields visible on the UI:

- Id
- State
- Type
- Message

This can be seen at `backend/models/mongoose/report.model.js`.

## How is data loaded

[This file](https://github.com/morkro/coding-challenge/blob/master/data/reports.json) is used to load data into the database whenever requested. There is an `.env` file which contains two properties that can let you decide if you want to dump and insert new data or start it with the existing data:

- `RESET_DATABASE=true`
- `NODE_ENV=dev`

The `reports.json` file contains a lot of information that cannot be easily explained and seems to refer to a much bigger use case than the one being presented for this coding exercise.
For the sake of simplicity, I ignored most of these fields when it's about fetching data from the server and the database.

# Project structure

The project structure should be easy to follow and quite similar to the standard structure:

- The entry point of the project is `index.js`
- `web/`: contains the `controllers/`, `middleware/` and `routes/` folders that are representing our API endpoints exposure
- in the `routes/` folder you will see how the controller and middleware are related to the two endpoints we expose
- the `reports.controller.js` file is probably the most important in this simple project because it contains the logic on how the data model is used when APIs are called.
- `models/`: contains the file related to the (only) implementation of our data layer, done using Mongoose.

This project uses `Winston` for logging, `dotenv` to store property configurations and `jest` for testing.

# Testing

A lot more could have been tested but I mainly wanted to write a basic test to prove:

- my familiarity with testing, mocking, TDD and SOLID principles
- the importance I give to testing

# What to improve

- Pagination needs to be implemented in order to manage too many results.
- Authentication should be handled
- `PUT /reports/:reportId` does not well indicate what is trying to do - I would advocate for more intuitive APIs
- The `Resolve` button deletes the element from the database. In real applications, you might want to defer that process to a later time (with a batch job) and keep that archived for audit purposes. For privacy reasons, we are forced anyway to remove the content at some point.
