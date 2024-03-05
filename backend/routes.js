import express from "express";
import { Authentication } from "./controllers/authenticationControl.js";
import protect from "./protect.js";

const router = express.Router();

router.post("/api/send-otp", Authentication.sendOtp);
router.post("/api/verify-otp", Authentication.verifyOtp);
router.post("/api/activate", protect, Authentication.activate);

export default router;