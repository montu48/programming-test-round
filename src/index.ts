import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./openapi.json";
import categoryRoutes from "./routes/category.routes";
import reportRoutes from "./routes/report.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);
app.use("/reports", reportRoutes);



// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Inventory Management API is running!");
});

const PORT = process.env.PORT || 4000;
const server  = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, server };
