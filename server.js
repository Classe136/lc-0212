const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//Imports

const pizzasRouter = require("./routers/pizzas");
const petsRouter = require("./routers/pets");
const toysRouter = require("./routers/toys");
const foodsRouter = require("./routers/foods");
const commentsRouter = require("./routers/comments");

const checkTime = require("./middlewares/checkTime");
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

//Global Middleware
//definisco dove sono gli asset statici
app.use(express.static("public")); //http://localhost:3000/path a partire da public della risorsa (ovvero senza public es.img/ecc.)
// il body di qualunque richiesta va parsato come application/json
app.use(express.json());

//app.use(checkTime);

//app.use("/pizzas", checkTime);

//Rotte
// rotte api con middlewares
app.use("/pizzas", pizzasRouter);
app.use("/pets", petsRouter);
app.use("/toys", toysRouter);
app.use("/foods", foodsRouter);
app.use("/comments", commentsRouter);

app.use(errorsHandler);

app.use(notFound);

//Server running in ascolto sulla porta
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}}`);
});
