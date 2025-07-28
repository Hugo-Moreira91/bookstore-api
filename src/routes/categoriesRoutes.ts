import { Router } from "express";
import { PrismaClient } from "../generated/prisma";

const categoryRouter = Router();
const prisma = new PrismaClient();

categoryRouter.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    await prisma.category.create({
      data: {
        name,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(500).send({ message: "Failed to register category." });
  }

  res.status(201).send();
});

export default categoryRouter;
