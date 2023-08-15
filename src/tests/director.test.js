const request = require("supertest");
const app = require("../app");

const URL_DIRECTORS = "/api/v1/directors";

let directorId;

const director = {
  firstName: "Maritn",
  lastName: "Scosece",
  nationality: "Estado Unidense",
  image:
    "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRyPzbmJ96_NB0dLxPCtVCL9rEwwkovxB00Ieksc8kkeBQlb1kMZGibfKNlR9xh033D",
  birthday: "1974-11-11",
};

test("POST -> '/api/v1/directors', should return status code 201 and res.body.firstname === director.name", async () => {
  const res = await request(app).post(URL_DIRECTORS).send(director);

  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(director.name);
});

test("GET '/api/v1/geners', should return status code 200, and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_DIRECTORS);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body.length).toBe(1);
});

test("GET 'URL_GENRES/:Id', should return status code 200 res.body.name === genre.name", async () => {
  const res = await request(app).get(`${URL_DIRECTORS}/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(director.name);
});

test("DELETE 'URL_GENRES/:Id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_DIRECTORS}/${directorId}`);

  expect(res.status).toBe(204);
});
