import * as fs from "node:fs/promises";
import path from "node:path";

const booksPath = path.resolve("db", "books.json");

export async function listBooks() {
  const books = await fs.readFile(booksPath, "utf-8");
  return JSON.parse(books);
}
