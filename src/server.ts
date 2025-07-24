import express from "express";
import booksRoutes from "./routes/booksRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/books", booksRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
