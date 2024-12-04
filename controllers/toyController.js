const items = require("../models/toys.js");
function index(req, res) {
  const itemName = req.query.name;
  const itemType = req.query.category;

  let list = [...items];
  if (itemName) {
    list = items.filter((item) =>
      list.name.toLowerCase().includes(itemName.toLowerCase())
    );
  }
  if (itemType) {
    list = list.filter((item) => item.category.toLowerCase() === itemType);
  }
  const response = {
    totalCount: items.length,
    data: list,
  };
  res.json(response);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (item) {
    res.json({
      success: true,
      item,
    });
  } else {
    res.status(404);
    res.json({
      success: false,
      message: "L'elemento non esiste",
    });
  }
}

function store(req, res) {
  res.send("Creazione nuovo elemento");
}

function update(req, res) {
  res.send("Modifica integrale dell'elemento' con id: " + req.params.id);
}
function destroy(req, res) {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    menu.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404);
    res.json({
      error: "404",
      message: "Elemento non trovato",
    });
  }
}

module.exports = { index, show, store, update, destroy };
