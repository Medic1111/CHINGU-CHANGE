const bcrypt = require("bcrypt");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("login test", () => {
  describe("when there is initially one user in db", () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash("testpw", 10);
      const user = new User({
        username: "testuser",
        email: "test@email.com",
        passwordHash,
      });

      await user.save();
    });

    test("user can log in with valid username and password", async () => {
      const loginCredentials = {
        username: "testuser",
        password: "testpw",
      };

      await api
        .post("/api/login")
        .send(loginCredentials)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("login fails with an incorrect password", async () => {
      const loginCredentials = {
        username: "testuser",
        password: "wrongpw",
      };

      const result = await api
        .post("/api/login")
        .send(loginCredentials)
        .expect(401)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("invalid username or password");
    });
    
    test("login fails with an unregistered username", async () => {
      const loginCredentials = {
        username: "unregisteredusername",
        password: "asdfjkl",
      };

      const result = await api
        .post("/api/login")
        .send(loginCredentials)
        .expect(404)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("username not registered");
    });

  });
});
