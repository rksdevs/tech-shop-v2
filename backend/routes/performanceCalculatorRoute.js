import express from "express";
import {protect, admin} from "../middlewares/authMiddleware.js";
import getPerformanceEstimate from "../controller/pcConfigDetailsController.js";
const router = express.Router();

router.post("/getPerformanceDetails",protect, admin, getPerformanceEstimate);

export default router;