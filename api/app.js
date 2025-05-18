import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

export const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.send("Usuário criado com sucesso");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;

  const { name, email } = req.body;

  const numberedId = parseInt(id);

  const user = await prisma.user.update({
    where: { id: numberedId },
    data: {
      name,
      email,
    },
  });
  res.send(`Usuário Atualizado com sucesso: ${user}`);
});
