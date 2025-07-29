"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../generated/prisma");
const categoryRouter = (0, express_1.Router)();
const prisma = new prisma_1.PrismaClient();
categoryRouter.post("/", async (req, res) => {
    const { name } = req.body;
    try {
        await prisma.category.create({
            data: {
                name,
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (error) {
        return res.status(500).send({ message: "Failed to register category." });
    }
    res.status(201).send();
});
exports.default = categoryRouter;
