const express = require("express");
const router = express.Router();

//const controller = require('../controllers/pizzaController');
//per usare controller.index ecc
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/foodController");
// index
router.get("/", index);

//Read one - Show
router.get("/:id", show);

//Create - Store
router.post("/", store);

//Update totale - Update
router.put("/:id", update);

//Update parziale - Modify
// router.patch("/:id", (req, res) => {
//   res.send("Modifica parziale della pizza con id: " + req.params.id);
// });

//Delete (cancellazione) - Destroy
router.delete("/:id", destroy);

module.exports = router;
