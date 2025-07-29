"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksRoutes_1 = __importDefault(require("./routes/booksRoutes"));
const authorsRoutes_1 = __importDefault(require("./routes/authorsRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use("/books", booksRoutes_1.default);
app.use("/authors", authorsRoutes_1.default);
app.use("/categories", categoriesRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
