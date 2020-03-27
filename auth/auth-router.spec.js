//imports
const request = require("supertest");
const server = require("../api/server");
const db= = require("../database/dbConfig");

describe("register endpoint", () =>{
    beforeEach(async () => {
        await db("user").truncate();
    });
    it("returns with the correct data a status of 200", () =>{
        request(server)
        .post("/api/auth/register")
        .send({username: "Dimos", password:"1234"})
        .then(res => {
            expect(res.status).toBe(200).expect("Content-Type", /json/);
        });
    });
    it("returns a new user", () =>{
        request(server)
        .post("api/auth/register")
        .send({username: "Dimos", password:"1234"})
        .then(response =>{
            expect(response).toContain({username:"Dimos"});
        });
    });
});

describe("login endpoint", () =>{
    it("return 200 status", () =>{
        request(server)
        .post("/api/auth/login")
        .send({username:"Dimos", password:"1234"})
        .then(response =>{
            expect(res.status)
            .toBe(200)
            .expect("Content-TYpe", /json/);
        });
    });
    it("returns a welcome message in login", () =>{
        request(server)
        .post("/api/auth/login")
        .send({username: "Dimos", password: "1234"})
        .then(response =>{
            expect(response).toContain({message:"Welcome Dimos"});
        });
    });
});

describe("jokes endpoint", () => {
    it("returns 200 status", () =>{
        request(server)
        .get("/api/jokes")
        .send({username: "Dimos", password:"1234"})
        .then(response => {
            expect(res.status)
            .toBe(200)
            .expect("Content-Type, /json/");
        });
    });
    it("returns status 401 with missing credentials", () =>{
        request(server)
        .get("api/jokes")
        .send({username:"", password:""})
        .then(response =>{
            expect(res.status).toBe(401);
        });
    });
});
