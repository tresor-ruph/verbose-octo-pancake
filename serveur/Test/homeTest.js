const request = require("supertest");
const app = require("../main");

describe("GET /api/test", () => {
  it("respond with Hello World", (done) => {
    request(app).get("/api/test").expect("hello world !", done);
  })
});
