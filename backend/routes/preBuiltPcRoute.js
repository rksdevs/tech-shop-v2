import express from "express";
const router = express.Router();
import { admin, protect } from "../middlewares/authMiddleware.js";
import { createPrebuiltPc, getAllPrebuiltPc, getSpecificPrebuiltPc, deleteOnePrebuiltPc, updatePrebuiltPc } from "../controller/preBuiltPcController.js";

router.get("/configure/all", protect, admin, getAllPrebuiltPc);

router.get("/configure/one/:id", protect, admin, getSpecificPrebuiltPc);

router.post("/configure/create", protect, admin, createPrebuiltPc);

router.put("/configure/update/:id", protect, admin, updatePrebuiltPc);

router.delete("/configure/delete/:id", protect, admin, deleteOnePrebuiltPc);

export default router;