import express from "express";
import booksRoutes from "./routes/booksRoutes";
import authorsRoutes from "./routes/authorsRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);
app.use("/categories", categoriesRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
