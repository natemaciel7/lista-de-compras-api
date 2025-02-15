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

app.get("/items", (req, res) => {
  const { type } = req.query;
  if (type) {
    const filteredItems = shoppingList.filter((item) => item.type === type);
    return res.json(filteredItems);
  }
  res.json(shoppingList);
});

app.get("/item/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "ID inválido" });
  }
  const item = shoppingList.find((item) => item.id === id);
  if (!item) {
    return res.status(404).json({ error: "item não encontrado" });
  }
  res.json(item);
});
