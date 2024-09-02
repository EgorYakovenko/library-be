import * as fs from "node:fs/promises";
import path from "node:path";

const booksPath = path.resolve("db", "books.json");

export async function listBooks() {
  const books = await fs.readFile(booksPath, "utf-8");
  return JSON.parse(books);
}

export async function addBook(data) {
  const books = await listBooks();
  const newBook = {
    // id: nanoid(),
    ...data,
  };
  books.push(newBook);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return newBook;
}

export async function removeBook(boobIsbn) {
  const books = await listBooks();
  const bookIndex = books.findIndex((book) => book.isbn === boobIsbn);
  if (bookIndex === -1) {
    return null;
  }
  const [result] = books.splice(bookIndex, 1);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return result;
}

export async function updateBookByIsbn(isbn, data) {
  const books = await listBooks();
  const index = books.findIndex((item) => item.isbn === isbn);
  if (index === -1) {
    return null;
  }
  books[index] = { isbn, ...data };
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return books[index];
}

export async function toggleBorrowStatus(isbn) {
  const books = await listBooks();
  const updatedBooks = books.map((book) =>
    book.isbn === isbn ? { ...book, borrowed: !book.borrowed } : book
  );
  await fs.writeFile(booksPath, JSON.stringify(updatedBooks, null, 2));
  const updatedBook = updatedBooks.find((book) => book.isbn === isbn);
  return updatedBook;
}

export async function searchBooks(query) {
  const books = await listBooks();
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.isbn.includes(query)
  );
  return filteredBooks;
}
