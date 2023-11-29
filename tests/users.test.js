const request = require("supertest");

const app = require("../src/app");
const database = require("../database");
const crypto = require("node:crypto");

afterAll(() => database.end());

describe("GET /api/users", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});

describe("GET /api/users/:id", () => {
  it("should return one user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no user", async () => {
    const response = await request(app).get("/api/users/0");

    expect(response.status).toEqual(404);
  });
});

describe("POST /api/users", () => {
  it("should return created user", async () => {
    const newUser = {
      firstname: "Hailleh",
      lastname: "Sellaiseh",
      email: `${crypto.randomUUID()}@twankil.com`,
      city: "Bomboclat",
      language: "Korean",
    };

    const response = await request(app)
      .post("/api/users")
      .send(newUser);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    const [result] = await database.query(
      "SELECT * FROM users WHERE id=?",
      response.body.id
    );

    const [usersInDatabase] = result;

    expect(usersInDatabase).toHaveProperty("firstname");
    expect(usersInDatabase.firstname).toStrictEqual(newUser.firstname);
  });
  it("should return an error", async () => {
    const userWithMissingProps = { firstname: "Hailleh", 
    lastname: "Sellaiseh",
    email: `${crypto.randomUUID()}@twankil.com`,
    city: "Bomboclat",
    language: "Korean",};


    const response = await request(app)
      .post("/api/users")
      .send(userWithMissingProps);

    expect(response.status).toEqual(201);
  });
});