const express = require("express");
const app = express();
const PORT = 3000;

//definisco dove sono gli asset statici
app.use(express.static("public")); //http://localhost:3000/....

const menu = require("./data/menu.js"); //i vostri posts

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

// leggo tutte le pizze
app.get("/pizzas", (req, res) => {
  const pizzaName = req.query.name;
  console.log(pizzaName);
  let response = {
    totalCount: menu.length,
    data: [...menu],
    // copia dell'array nel caso dovessimo filtrare i dati
  };

  if (pizzaName) {
    response.data = menu.filter((pizza) =>
      pizza.name.toLowerCase().includes(pizzaName.toLowerCase())
    );

    if (response.data.length < 1) {
      res.status(404);
      response = {
        error: 404,
        message: "Non ci sono pizze per la tua ricerca",
      };
    }
  }
  res.json(response);
});

// leggere una sola pizza
app.get("/pizzas/:id", (req, res) => {
  //pizzas/1/
  console.log(req.params);
  const id = parseInt(req.params.id);
  const item = menu.find((pizza) => pizza.id === id);
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

//rotta fallback
app.all("*", (req, res) => {
  res.status(404).send("<h1>Error 404 - Not Found !</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}}`);
});
