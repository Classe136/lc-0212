const express = require("express");
const router = express.Router();

const pets = require("../data/pets.js"); //i vostri posts
// index
router.get("/", (req, res) => {
  const itemName = req.query.name;
  console.log(itemName);
  let response = {
    totalCount: pets.length,
    data: [...pets],
    // copia dell'array nel caso dovessimo filtrare i dati
  };

  if (itemName) {
    response.data = pets.filter((item) =>
      item.name.toLowerCase().includes(itemName.toLowerCase())
    );

    if (response.data.length < 1) {
      res.status(404);
      response = {
        error: 404,
        message: "Non ci sono pets per la tua ricerca",
      };
    }
  }
  res.json(response);
});

// leggere una sola pizza - Read one - Show
router.get("/:id", (req, res) => {
  //pizzas/1/
  console.log(req.params);
  const id = parseInt(req.params.id);
  const item = pets.find((item) => item.id === id);
  if (item) {
    res.json({
      success: true,
      item,
    });
  } else {
    res.status(404);
    res.json({
      success: false,
      message: "Il pet non esiste",
    });
  }
});

//Create - Store
router.post("/", (req, res) => {
  res.send("Creazione nuova pet");
});

//Update totale - Update
router.put("/:id", (req, res) => {
  res.send("Modifica integrale del pet");
});

//Update parziale - Modify
router.patch("/:id", (req, res) => {
  res.send("Modifica parziale del pet");
});

//Delete (cancellazione) - Destroy
router.delete("/:id", (req, res) => {
  res.send("Cancellazione del pet");
});

module.exports = router;
