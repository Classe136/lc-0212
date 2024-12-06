const menu = require("../models/menu.js"); //i vostri posts
const comments = require("../models/comments.js"); //i vostri posts

/**
 * GET /pizzas
 * @summary Get all pizzas with optional filtering by name and ingredient
 * @param {string} [name] - name of the pizza
 * @param {string} [ingredient] - ingredient of the pizza
 * @returns {object} - response object with total count and array of filtered or all pizzas
 */
function index(req, res) {
  //pippo.get();
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
  const id = parseInt(req.params.id);
  const item = menu.find((item) => item.id === id);
  const itemComments = comments.filter((comment) => comment.pizza_id === id);
  /*const response = item
    ? { success: true, item }
    : { success: false, message: "La pizza non esiste" };

  if (!item) {
    res.status(404);
  }
  res.json(response);*/
  if (!item) {
    //throw new Error("404 - La pizza non esiste");
    res.status(404);
    res.json({ success: false, message: "La pizza non esiste" });
    return;
  }
  const itemWithComments = { ...item, comments: itemComments };
  res.json({ success: true, itemWithComments });
}

function store(req, res) {
  //console.log(req.body);
  //const newId = menu[menu.length - 1].id + 1;

  let newId = 0;
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].id > newId) {
      newId = menu[i].id;
    }
  }
  newId += 1;

  //console.log(req.headers["content-type"]);
  const newPizza = {
    id: newId,
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
  };

  menu.push(newPizza);
  res.status(201).json(newPizza);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const item = menu.find((item) => item.id === id);
  if (!item) {
    res.status(404).json({ success: false, message: "La pizza non esiste" });
    return;
  }

  console.log(req.body);
  // item.name = req.body.name;
  // item.image = req.body.image;
  // item.ingredients = req.body.ingredients;
  for (key in item) {
    if (key !== "id") {
      item[key] = req.body[key];
    }
  }

  console.log(menu);
  res.json(item);
}
function destroy(req, res) {
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
