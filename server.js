const express = require("express");
const cors = require("cors");

const items = require("./data/items");

const app = express();
app.use(cors());

let currentIndex = 0;

function makeResponse() {
  return {
    currentIndex,
    item: items[currentIndex],
    totalItems: items.length
  };
}

app.get("/item", (req, res) => {
  res.json(makeResponse());
});

app.get("/item/next", (req, res) => {
  currentIndex = (currentIndex + 1) % items.length;
  res.json(makeResponse());
});

app.get("/item/prev", (req, res) => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  res.json(makeResponse());
});

app.get("/item/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= items.length) {
    return res.status(400).json({ error: "Invalid index" });
  }
  currentIndex = id;
  res.json(makeResponse());
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
