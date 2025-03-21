import request from "supertest";
import { server, app } from "../src/index";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      role: "USER",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe("testuser@example.com");
  });

  it("should login a user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
