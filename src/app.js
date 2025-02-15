let shoppingList = [];
let currentId = 1;

const express = require("express");

const app = express();
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post("/items", (req, res) => {
  const { name, quantity, type } = req.body;
  if (!name || !quantity || type)
    return res.status(422).json({ error: "todos os campos são obrigatórios" });
  const itemExists = shoppingList.some((item) => item.name === name);
  if (itemExists) {
    return res.status(409).json({ error: "item já existe na lista" });
  }
  const newItem = { id: currentId++, name, quantity, type };
  shoppingList.push(newItem);
  res.status(201).json(newItem);
});
