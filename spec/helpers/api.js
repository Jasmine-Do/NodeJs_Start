const Request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../../server");
    });

    describe("GET /", () => {
        const data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        it("Status 200", () => {
            expect(data.status).toBe(200);
        });

        it("Body", () => {
            expect(data.body).toBe("Home show list data");
        });
    });

});

