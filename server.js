const express = require("express");
const app = express();
const PORT = 3000;

const pizzasRouter = require("./routers/pizzas");
const petsRouter = require("./routers/pets");

//definisco dove sono gli asset statici
app.use(express.static("public")); //http://localhost:3000/

//rotte web

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/pages" });
});

// app.get("/", getData);

//callback:
// function getData(req, res){
//   res.sendFile("index.html", { root: __dirname + "/pages" });
// }

// rotte api
app.use("/pizzas", pizzasRouter);
app.use("/pets", petsRouter);

// leggo tutte le pizze - Read all - Index

//rotta fallback
app.all("*", (req, res) => {
  res.status(404).json({ error: "404", message: "Not Found !" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}}`);
});
