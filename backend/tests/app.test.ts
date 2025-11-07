import request from "supertest";

import app from "../src/app";

describe("Express App", () => {
    it("GET / should return hello message", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message","Hello, Express + TypeScript!");
    })
})