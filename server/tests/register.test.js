const bcrypt = require("bcrypt");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("register test", () => {
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

    test("a valid user can be added", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "asdfjkl;",
        email: "email@email.com",
        password: "asdfjkl;",
      };

      await api
        .post("/api/register")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((user) => user.username);
      expect(usernames).toContain("asdfjkl;");
    });

    test("creation fails if email already exists", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "asdfjkl;",
        email: "test@email.com",
        password: "asdfjkl;",
      };

      const result = await api
        .post("/api/register")
        .send(newUser)
        .expect(409)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("email is already in use");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("creation fails if username already exists", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "testuser",
        email: "test1@email.com",
        password: "asdfjkl;",
      };

      const result = await api
        .post("/api/register")
        .send(newUser)
        .expect(409)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("username is already taken");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("creation fails if email is not given", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        email: "test1@email.com",
        password: "asdfjkl;",
      };

      const result = await api
        .post("/api/register")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("all fields required");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("creation fails if email is not given", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "asdfjkl;",
        password: "asdfjkl;",
      };

      const result = await api
        .post("/api/register")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("all fields required");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("creation fails if password is not given", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "asdfjkl;",
        email: "email@email.com",
      };

      const result = await api
        .post("/api/register")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("all fields required");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });
  });
});
