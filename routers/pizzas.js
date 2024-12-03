const express = require("express");
const router = express.Router();

const menu = require("../data/menu.js"); //i vostri posts
// index
router.get("/", (req, res) => {
  const itemName = req.query.name;
  console.log(itemName);
  let response = {
    totalCount: menu.length,
    data: [...menu],
    // copia dell'array nel caso dovessimo filtrare i dati
  };

  if (itemName) {
    response.data = menu.filter((item) =>
      item.name.toLowerCase().includes(itemName.toLowerCase())
    );

    // if (response.data.length < 1) {
    //   res.status(404);
    //   response = {
    //     error: 404,
    //     message: "Non ci sono pizze per la tua ricerca",
    //   };
    // }
  }
  res.json(response);
});

// leggere una sola pizza - Read one - Show
router.get("/:id", (req, res) => {
  //pizzas/1/
  console.log(req.params);
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
});

//Create - Store
router.post("/", (req, res) => {
  res.send("Creazione nuova pizza");
});

//Update totale - Update
router.put("/:id", (req, res) => {
  res.send("Modifica integrale della pizza");
});

//Update parziale - Modify
router.patch("/:id", (req, res) => {
  res.send("Modifica parziale della pizza");
});

//Delete (cancellazione) - Destroy
router.delete("/:id", (req, res) => {
  res.send("Cancellazione della pizza");
});

module.exports = router;
