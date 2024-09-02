import express from "express";

import { getAllBooks } from "../controllers/controllers.js";

const router = express.Router();

router.get("/", getAllBooks);

export default router;
