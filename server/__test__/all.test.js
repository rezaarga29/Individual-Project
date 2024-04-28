const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

const adminCredential = {
  email: "admin@gmail.com",
  password: "123123",
};

const staffCredential = {
  email: "user@gmail.com",
  password: "123123",
};

let adminToken;
let staffToken;

describe("Testing for Login Endpoint", () => {
  test("Should successfully login and return access token", async () => {
    const response = await request(app).post("/login").send(adminCredential);
    const responseStaff = await request(app)
      .post("/login")
      .send(staffCredential);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
    adminToken = response.body.access_token; // Simpan token untuk pengujian selanjutnya
    staffToken = responseStaff.body.access_token; // Simpan token untuk pengujian selanjutnya
  });

  test("Should return error when email is not provided", async () => {
    const response = await request(app)
      .post("/login")
      .send({ password: adminCredential.password });

    expect(response.status).toBe(400);
  });

  test("Should return error when password is not provided", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: adminCredential.email });

    expect(response.status).toBe(400);
  });

  test("Should return error when email is invalid or not registered", async () => {
    const response = await request(app).post("/login").send({
      email: "invalid@example.com",
      password: adminCredential.password,
    });

    expect(response.status).toBe(401);
  });

  test("Should return error when password is incorrect", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: adminCredential.email, password: "wrongpassword" });

    expect(response.status).toBe(401);
  });
});

//!======================================================================

describe("Testing for Watchlist Endpoint", () => {
  beforeAll(async () => {
    try {
      let data = require("../data/watchlist.json").map((e) => {
        e.createdAt = new Date();
        e.updatedAt = new Date();
        return e;
      });
      await sequelize.queryInterface.bulkInsert("Watchlists", data, {});
    } catch (error) {
      console.log(error);
    }
  });

  test("Should successfully create a new comic", async () => {
    const comicData = {
      title: "string",
      cover: "string",
      url: "string",
      rating: 2,
    };

    const response = await request(app)
      .post("/comic")
      .send(comicData)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
  });

  test("Should return error when not logged in", async () => {
    const comicData = {
      title: "string1",
      cover: "string1",
      url: "string1",
      rating: 2,
    };

    const response = await request(app).post("/comic").send(comicData);

    expect(response.status).toBe(401);
  });

  test("Should return error when provided invalid token", async () => {
    const comicData = {
      title: "string1",
      cover: "string1",
      url: "string1",
      rating: 2,
    };

    const response = await request(app)
      .post("/comic")
      .send(comicData)
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).toBe(401);
  });

  test("Should return error when request body is not valid", async () => {
    const response = await request(app)
      .post("/comic")
      .send({})
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(400);
  });
});

afterAll(async () => {
  try {
    await sequelize.queryInterface.bulkDelete("Watchlists", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
  }
});
//!======================================================================

describe("Testing for Update and Delete Watchlist Endpoint", () => {
  let comicId = [];

  beforeAll(async () => {
    try {
      // Inisialisasi data dummy baru
      const comicData = [
        {
          title: "string2",
          cover: "string2",
          url: "string2",
          rating: 2,
        },
        {
          title: "string3",
          cover: "string3",
          url: "string3",
          rating: 2,
        },
      ];

      for (const comic of comicData) {
        const response = await request(app)
          .post("/comic")
          .send(comic)
          .set("Authorization", `Bearer ${adminToken}`);
        comicId.push(response.body.data.id);
      }
      console.log(comicId[0], "<<<<<<<<<<<<<");
    } catch (error) {
      console.log(error);
    }
  });

  test("Should successfully update comic data based on the provided id", async () => {
    // Data yang akan digunakan untuk mengupdate comic
    const updateComicData = {
      title: "string4",
      cover: "string4",
      url: "string4",
      rating: 2,
    };

    const response = await request(app)
      .put(`/comic/${comicId[0]}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updateComicData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
  });

  test("Should return error when not logged in", async () => {
    const response = await request(app).put(`/comic/${comicId[0]}`).send({});

    expect(response.status).toBe(401);
  });

  test("Should return error when provided invalid token", async () => {
    const response = await request(app)
      .put(`/comic/${comicId[0]}`)
      .set("Authorization", "Bearer invalidtoken")
      .send({});

    expect(response.status).toBe(401);
  });

  test("Should return error when provided ID is not found in the database", async () => {
    const nonExistingId = 9999;

    const response = await request(app)
      .put(`/comic/${nonExistingId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({});

    expect(response.status).toBe(404);
  });

  test("Should return error when trying to update comic not owned by user", async () => {
    // Kirim request untuk mengupdate data comic yang bukan miliknya
    const response = await request(app)
      .put(`/comic/${comicId[0]}`)
      .set("Authorization", `Bearer ${staffToken}`)
      .send({});

    expect(response.status).toBe(403);
  });

  test("Should return error when request body is not valid", async () => {
    const response = await request(app)
      .put(`/comic/${comicId[0]}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({});

    expect(response.status).toBe(400);
  });

  test("Should successfully delete comic by id", async () => {
    const response = await request(app)
      .delete(`/comic/${comicId[0]}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("Should return error when not logged in", async () => {
    const response = await request(app).delete(`/comic/${comicId[0]}`);

    expect(response.status).toBe(401);
  });

  test("Should return error when provided invalid token", async () => {
    const response = await request(app)
      .delete(`/comic/${comicId[0]}`)
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).toBe(401);
  });

  test("Should return error when comic id is not found in the database", async () => {
    const nonExistingId = 9999;

    const response = await request(app)
      .delete(`/comic/${nonExistingId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
  });

  test("Should return error when staff tries to delete comic that is not theirs", async () => {
    const response = await request(app)
      .delete(`/comic/${comicId[1]}`)
      .set("Authorization", `Bearer ${staffToken}`);

    expect(response.status).toBe(403);
  });
});

//!======================================================================
