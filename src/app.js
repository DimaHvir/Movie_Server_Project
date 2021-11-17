if (process.env.USER) require("dotenv").config(); //review this 

const express = require("express");
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const logger = require('./config/logger');
const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
