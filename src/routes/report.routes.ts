import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";
import { getReportsHandler } from "../controllers/reports.controller";

const router = express.Router();

router.get("/reports", authenticate, authorizeAdmin, getReportsHandler);



export default router;
