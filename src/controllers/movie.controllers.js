const catchError = require("../utils/catchError");
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Director = require("../models/Director");
const Actor = require("../models/Actor");

const getAll = catchError(async (req, res) => {
  const results = await Movie.findAll({
    include: [
      {
        model: Genre,
      },
      {
        model: Director,
      },
      {
        model: Actor,
      },
    ],
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Movie.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.findByPk(id);
  if (!result) return res.sendStatus(400);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.destroy({ where: { id } });
  if (!result) return res.sendStatus(400);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(400);
  return res.json(result[1][0]);
});

const setGenre = catchError(async (req, res) => {
  const { id } = req.params;
  const movies = await Movie.findByPk(id);
  if (!movies) return res.sendStatus(400);

  await movies.setGenres(req.body);

  const genre = await movies.getGenres();
  return res.json(genre);
});
const setActor = catchError(async (req, res) => {
  const { id } = req.params;
  const movies = await Movie.findByPk(id);
  if (!movies) return res.sendStatus(400);

  await movies.setActors(req.body);

  const actor = await movies.getActors();
  return res.json(actor);
});
const setDirector = catchError(async (req, res) => {
  const { id } = req.params;
  const movies = await Movie.findByPk(id);

  await movies.setDirectors(req.body);

  const director = await movies.getDirectors();

  return res.json(director);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setGenre,
  setActor,
  setDirector,
};
