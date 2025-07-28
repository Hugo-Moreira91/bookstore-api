import { Router } from "express";
import { PrismaClient } from "../generated/prisma";

const authorRouter = Router();
const prisma = new PrismaClient();

authorRouter.post("/", async (req, res) => {
  const { name, birthdate, nationality } = req.body;

  try {
    await prisma.author.create({
      data: {
        name,
        birthdate: new Date(birthdate),
        nationality,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(500).send({ message: "Failed to register author." });
  }

  res.status(201).send();
});

export default authorRouter;
