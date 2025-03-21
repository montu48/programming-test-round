import { Request, Response } from "express";
import { getInventoryReports } from "../services/reports.service";


export const getReportsHandler = async (req: Request, res: Response) => {
  try {
    const reports = await getInventoryReports();
    res.json({ success: true, data: reports });
  } catch (error) {
    console.error("Error generating reports:", error);
    res.status(500).json({ error: "Failed to generate reports" });
  }
};
