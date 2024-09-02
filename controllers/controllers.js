import wrapper from "../helpers/wrapper.js";

import {
  addBook,
  listBooks,
  removeBook,
  updateBookByIsbn,
  toggleBorrowStatus,
  searchBooks,
} from "../services/services.js";

export const getAllBooks = wrapper(async (req, res) => {
  const result = await listBooks();
  res.json(result);
});

export const createBook = wrapper(async (req, res) => {
  const result = await addBook(req.body);
  res.status(201).json(result);
});

export const deleteBook = wrapper(async (req, res) => {
  const { isbn } = req.params;
  const result = await removeBook(isbn);
});

export const updateBook = wrapper(async (req, res) => {
  const { isbn } = req.params;
  const result = await updateBookByIsbn(isbn, req.body);
  if (!result) {
    res.json(result);
  }
});

export const toggleBookBorrowStatus = wrapper(async (req, res) => {
  const { isbn } = req.params;
  const updatedBook = await toggleBorrowStatus(isbn);
  if (!updatedBook) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json(updatedBook);
});

export const searchForBooks = wrapper(async (req, res) => {
  const { query } = req.query;
  const result = await searchBooks(query);
  res.json(result);
});
