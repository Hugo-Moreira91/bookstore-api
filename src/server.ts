import express from "express";
import booksRoutes from "./routes/booksRoutes";
import authorsRoutes from "./routes/authorsRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);
app.use("/categories", categoriesRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
