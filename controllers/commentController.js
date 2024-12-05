const comments = require("../models/comments.js"); //i vostri posts

function index(req, res) {
  const response = {
    totalCount: comments.length,
    data: comments,
  };
  res.json(response);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const item = comments.find((item) => item.id === id);
  /*const response = item
    ? { success: true, item }
    : { success: false, message: "La pizza non esiste" };

  if (!item) {
    res.status(404);
  }
  res.json(response);*/
  if (!item) {
    res.json({ success: false, message: "Il commento non esiste" });
    return;
  }
  res.json({ success: true, item });
}

function store(req, res) {
  //console.log(req.body);
  //const newId = menu[menu.length - 1].id + 1;

  let newId = 0;
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id > newId) {
      newId = comments[i].id;
    }
  }
  newId += 1;

  //console.log(req.headers["content-type"]);
  const newComment = {
    id: newId,
    pizza_id: req.body.pizza_id,
    testo: req.body.testo,
  };

  menu.push(newComment);
  res.status(201).json(newComment);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const item = comments.find((item) => item.id === id);
  if (!item) {
    res.status(404).json({ success: false, message: "Il commento non esiste" });
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

  console.log(comments);
  res.json(item);
}
function destroy(req, res) {
  const id = parseInt(req.params.id);
  const index = comments.findIndex((item) => item.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404);
    res.json({
      error: "404",
      message: "Il commento non esiste",
    });
  }
}

module.exports = { index, show, store, update, destroy };
