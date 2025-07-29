"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../generated/prisma");
const authorRouter = (0, express_1.Router)();
const prisma = new prisma_1.PrismaClient();
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
    }
    catch (error) {
        return res.status(500).send({ message: "Failed to register author." });
    }
    res.status(201).send();
});
exports.default = authorRouter;
