import express from "express";

import {
  createBook,
  getAllBooks,
  deleteBook,
  updateBook,
  toggleBookBorrowStatus,
  searchForBooks,
} from "../controllers/controllers.js";

import { emptyBody } from "../helpers/emptyBody.js";
import validateBody from "../helpers/validateBody.js";
import { createBookSchema, updateBookSchema } from "../shemas/shemas.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", validateBody(createBookSchema), createBook);
router.delete("/:isbn", deleteBook);
router.put("/:isbn", emptyBody, validateBody(updateBookSchema), updateBook);
router.patch("/:isbn/borrow", toggleBookBorrowStatus);
router.get("/search", searchForBooks);

export default router;
