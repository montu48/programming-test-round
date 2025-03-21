import request from "supertest";
import { server, app } from "../src/index";

describe("Product API", () => {
  let token;

  beforeAll(async () => {
    const registerResponse = await request(app).post("/auth/register").send({
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

  it("should create a new product", async () => {
    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Product",
        description: "This is a test product",
        price: 10.99,
        quantity: 100,
        categoryIds: [],
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should get all products", async () => {
    const response = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
