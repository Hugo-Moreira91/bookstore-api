import { Router } from "express";
import { PrismaClient } from "../generated/prisma";

const bookRouter = Router();
const prisma = new PrismaClient();

bookRouter.get("/", async (_, res) => {
  const books = await prisma.book.findMany({
    orderBy: { title: "asc" },
    include: {
      author: true,
      category: true,
    },
  });
  res.json(books);
});

bookRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.status(200).send(book);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(500).send({ message: "Failed to fetch book." });
  }
});

bookRouter.post("/", async (req, res) => {
  const { title, publication_year, language, price, author_id, category_id } = req.body;

  try {
    await prisma.book.create({
      data: {
        title,
        publication_year,
        language,
        price,
        author_id,
        category_id,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(500).send({ message: "Failed to register book." });
  }

  res.status(201).send();
});

bookRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      return res.status(404).send({ message: "Book not found." });
    }

    const data = { ...req.body };

    await prisma.book.update({
      where: {
        id,
      },
      data,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(500).send({ message: "Failed to update book." });
  }

  res.status(200).send();
});

bookRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      return res.status(404).send({ message: "Book not found." });
    }

    await prisma.book.delete({
      where: {
        id,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(500).send({ message: "Failed to remove book." });
  }

  res.status(200).send();
});

bookRouter.get("/category/:categoryId", async (req, res) => {
  const categoryId = Number(req.params.categoryId);

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return res.status(404).send({ message: "Category not found." });
    }

    const booksFilteredByCategory = await prisma.book.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        category: true,
      },
      where: {
        category_id: categoryId,
      },
    });

    res.json(booksFilteredByCategory);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(500).send({ message: "Failed to listed books by category." });
  }
});

bookRouter.get("/author/:authorId", async (req, res) => {
  const authorId = Number(req.params.authorId);

  try {
    const author = await prisma.author.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!author) {
      return res.status(404).send({ message: "Author not found." });
    }

    const booksFilteredByAuthor = await prisma.book.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        author: true,
      },
      where: {
        author_id: authorId,
      },
    });

    res.json(booksFilteredByAuthor);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(500).send({ message: "Failed to listed books by author." });
  }
});

bookRouter.get("/year/:year", async (req, res) => {
  try {
    if (req.params.year.length != 4) {
      return res
        .status(404)
        .send({ message: "Invalid year; year must have four digits." });
    }

    const year = Number(req.params.year);

    const booksPublishedAfter = await prisma.book.findMany({
      orderBy: {
        title: "asc",
      },
      where: {
        publication_year: {
          gt: year,
        },
      },
    });

    res.json(booksPublishedAfter);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(500).send({
      message: "Failed to list books with publication year above the required year.",
    });
  }
});

bookRouter.get("/", async (req, res) => {
  const { author, category } = req.query;

  const filters: { author_id?: number; category_id?: number } = {};

  if (author) filters.author_id = Number(author);
  if (category) filters.category_id = Number(category);

  try {
    const books = await prisma.book.findMany({
      where: filters,
      orderBy: {
        title: "asc",
      },
      include: {
        author: true,
        category: true,
      },
    });

    if (!books) {
      return res
        .status(404)
        .send({ message: "Books by author and/or category not found." });
    }

    res.json(books);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to filter books by author and/or category." });
  }
});

export default bookRouter;
