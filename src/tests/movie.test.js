const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");

require("../models");
const URL_MOVIES = "/api/v1/movies";

let moviesId;

const movies = {
  name: "Titanic",
  image:
    "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRyPzbmJ96_NB0dLxPCtVCL9rEwwkovxB00Ieksc8kkeBQlb1kMZGibfKNlR9xh033D",
  synopsis: "Si cabian los 2 en la tabla",
  releaseYear: "2010-01-01",
};

test("POST -> 'URL_MOVIES', should return status code 201, and res.body.name ==== movies.name", async () => {
  const res = await request(app).post(URL_MOVIES).send(movies);
  moviesId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movies.name);
});

test("GET -> 'URL_MOVIES', should return code 200 and res.body.length === 1", async () => {
  const res = await request(app).get(URL_MOVIES);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("PUT -> 'URL_MOVIES/:id', should return status code 200 and res.body.name === moviesUpdate.name", async () => {
  const movieUpdate = {
    name: "Titanic II",
  };
  const res = await request(app)
    .put(`${URL_MOVIES}/${moviesId}`)
    .send(movieUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(actorUpdate.name);
});

test("DELETE> 'URL_MOVIES/:id', should return code 204", async () => {
  const res = await request(app).delete(`${URL_MOVIES}/${moviesId}`);

  expect(res.status).toBe(204);
});

test("POST ->'URL_SONGS/:id/actors', should retrun status code 200 and res.body.length === 1", async () => {
  const actor = {
    firstName: "Leonardo",
    lastName: "Dicaprio",
    nationality: "Estado Unidense",
    image:
      "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRyPzbmJ96_NB0dLxPCtVCL9rEwwkovxB00Ieksc8kkeBQlb1kMZGibfKNlR9xh033D",
    birthday: "1974-11-11",
  };

  const createActor = await Actor.create(actor);

  const res = await request(app)
    .post(`${URL_MOVIES}/${moviesId}/actors`)
    .send([createActor.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(2);
  expect(res.body[0].id).toBe(createActor.id);

  await createGenre.destroy();
});
