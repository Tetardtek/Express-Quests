const express = require("express");
require("dotenv").config();

const port = process.env.APP_PORT;
const app = express();
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovies);

const userControllers = require("./controllers/userControllers");
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUsersById);
app.post("/api/users", userControllers.postUsers);

module.exports = app;

app.post("/api/movies", movieControllers.postMovies);
app.post("/api/users", userControllers.postUsers);