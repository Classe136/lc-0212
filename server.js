const express = require("express");
const app = express();

//Middleware

// il body di qualunque richiesta va parsato come application/json
app.use(express.json());
//definisco dove sono gli asset statici
app.use(express.static("public")); //http://localhost:3000/

const pizzasRouter = require("./routers/pizzas");

const petsRouter = require("./routers/pets");
const toysRouter = require("./routers/toys");
const foodsRouter = require("./routers/foods");
const commentsRouter = require("./routers/comments");

//definisco dove sono gli asset statici
app.use(express.static("public")); //http://localhost:3000/

const homeController = require("./controllers/homeController");
//rotte web

app.get("/", homeController.index);

// rotte api
app.use("/pizzas", pizzasRouter);
app.use("/pets", petsRouter);
app.use("/toys", toysRouter);
app.use("/foods", foodsRouter);
app.use("/comments", commentsRouter);

//rotta fallback
app.all("*", (req, res) => {
  res.status(404).json({ error: "404", message: "Not Found !" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}}`);
});

/*
MVC = Model View Controller

Routing

*/
