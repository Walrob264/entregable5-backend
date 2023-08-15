const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setGenre,
  setActor,
  setDirector,
} = require("../controllers/movie.controllers");
const express = require("express");

const routerMovie = express.Router();

routerMovie.route("/").get(getAll).post(create);

routerMovie.route("/:id").get(getOne).delete(remove).put(update);

routerMovie.route("/:id/genres").post(setGenre);

routerMovie.route("/:id/actors").post(setActor);

routerMovie.route("/:id/directors").post(setDirector);

module.exports = routerMovie;