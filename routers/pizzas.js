const express = require("express");
const router = express.Router();
const checkTime = require("../middlewares/checkTime");
//const controller = require('../controllers/pizzaController');
//per usare controller.index ecc
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/pizzaController");

//router.use(checkTime);
//Rotte

// index
router.get("/", index);

// leggere una sola pizza - Read one - Show
//router.get("/:id", checkTime, show);
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
