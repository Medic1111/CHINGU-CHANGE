const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("saveCurrencies test", () => {
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

    test.only("user can save a pair of currencies", async () => {
      const userBefore = await User.findOne({ username: "testuser" });
      const userID = userBefore._id.toString();
      const currenciesAtStart = userBefore.currencies;
      const saveObject = {
        original: "USD",
        convertTo: "CAD",
        userID: userID,
      };
      const saveObject2 = {
        original: "USD",
        convertTo: "PHP",
        userID: userID,
      };

      await api
        .post("/api/saveCurrencies")
        .send(saveObject)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      await api
        .post("/api/saveCurrencies")
        .send(saveObject2)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const userAfter = await User.findOne({ username: "testuser" });
      const currenciesAtEnd = userAfter.currencies;
      expect(currenciesAtEnd).toHaveLength(currenciesAtStart.length + 2);
    });
  });
});
