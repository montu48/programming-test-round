import request from "supertest";
import { server, app } from "../src/index";

describe("Category API", () => {
  let token;

  beforeAll(async () => {
    // Register and login to get a token
    const registerResponse = await request(app)
      .post("/auth/register")
      .send({
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "ADMIN",
      });

    const loginResponse = await request(app).post("/auth/login").send({
      email: "admin@example.com",
      password: "admin123",
    });

    token = loginResponse.body.token;
  });

  it("should create a new category", async () => {
    const response = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Category",
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should get all categories", async () => {
    const response = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
