const menu = require("../models/menu.js"); //i vostri posts

function index(req, res) {
  const itemName = req.query.name;
  const itemIngredient = req.query.ingredient;
  //console.log(itemName);
  // const response = {
  //   totalCount: menu.length,
  //   data: [...menu],
  //   // copia dell'array nel caso dovessimo filtrare i dati
  // };

  let menuCopy = [...menu];
  if (itemName) {
    menuCopy = menu.filter((item) =>
      item.name.toLowerCase().includes(itemName.toLowerCase())
    );
  }
  if (itemIngredient) {
    menuCopy = menuCopy.filter((item) =>
      item.ingredients.includes(itemIngredient)
    );
  }
  const response = {
    totalCount: menu.length,
    data: menuCopy,
  };
  res.json(response);
}

function show(req, res) {
  //pizzas/1/
  //console.log(req.params);
  const id = parseInt(req.params.id);
  const item = menu.find((item) => item.id === id);
  if (item) {
    res.json({
      success: true,
      item,
    });
  } else {
    res.status(404);
    res.json({
      success: false,
      message: "La pizza non esiste",
    });
  }
}

function store(req, res) {
  res.send("Creazione nuova pizza");
}

function update(req, res) {
  res.send("Modifica integrale della pizza con id: " + req.params.id);
}
function destroy(req, res) {
  //res.send("Cancellazione della pizza con id: " + req.params.id);
  const id = parseInt(req.params.id);
  const index = menu.findIndex((item) => item.id === id);
  if (index !== -1) {
    menu.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404);
    res.json({
      error: "404",
      message: "Pizza non trovata",
    });
  }
}

module.exports = { index, show, store, update, destroy };
