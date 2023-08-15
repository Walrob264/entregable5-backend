const request = require("supertest");
const app = require("../app");

require("../models");
const URL_ACTORS = "/api/v1/actors";

let actorId;

const actor = {
  firstName: "Leonardo",
  lastName: "Dicaprio",
  nationality: "Estado Unidense",
  image:
    "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRyPzbmJ96_NB0dLxPCtVCL9rEwwkovxB00Ieksc8kkeBQlb1kMZGibfKNlR9xh033D",
  birthday: "1974-11-11",
};

test("POST -> 'URL_ACTORS', should return status code 201, and res.body.name ==== actor.name", async () => {
  const res = await request(app).post(URL_ACTORS).send(actor);
  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("GET -> 'URL_ACTORS', should return code 200 and res.body.length === 1", async () => {
  const res = await request(app).get(URL_ACTORS);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(2);
});

test("PUT -> 'URL_ACTORS/:id', should return status code 200 and res.body.name === artistUpdate.name", async () => {
  const actorUpdate = {
    firstName: "Juanito",
  };
  const res = await request(app)
    .put(`${URL_ACTORS}/${actorId}`)
    .send(actorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actorUpdate.firstName);
});

test("DELETE> 'URL_ACTORS/:id', should return code 204", async () => {
  const res = await request(app).delete(`${URL_ACTORS}/${actorId}`);

  expect(res.status).toBe(204);
});
