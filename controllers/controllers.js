import wrapper from "../helpers/wrapper.js";

import { listBooks } from "../services/services.js";

export const getAllBooks = wrapper(async (req, res) => {
  const result = await listBooks();
  res.json(result);
});
