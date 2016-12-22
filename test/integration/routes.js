
const app = require("../../server");
const supertest = require("supertest");
const request = supertest(app);

describe("Routes", () => {
    describe("Route POST /validate", () => {
        it("Should assert two images are from same person", done => {
            request.get("/validate")
                .expect(200)
                .end(done);
        });
        it("Should assert two images are from different people", done => {
            done();
        });
    });
});