const express = require("express");
const app = express();
const PORT = 3000;

//definisco dove sono gli asset statici
app.use(express.static("public")); //http://localhost:3000/

const menu = require("./data/menu.js");

//rotte
app.get("/", (req, res) => {
  res.send("<h1>Api delle pizze</h1>");
});

app.get("/pizzas", (req, res) => {
  //console.log("request:", req);
  //console.log("response: ", res);
  // http://localhost:3000/pizzas?name=margherita&ingredients=sale
  //console.log(req.query);
  const pizzaName = req.query.name;
  console.log(pizzaName);
  let pizze = [...menu];

  if (pizzaName) {
    pizze = menu.find((pizza) => {
      return pizza.name.toLowerCase() === pizzaName.toLowerCase();
    });
    if (!pizze) {
      pizze = {
        error: "Pizza non trovata",
      };
    }
  }
  res.json(pizze);
});

//rotta fallback
app.all("*", (req, res) => {
  res.status(404).send("<h1>Error 404 - Not Found !</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}}`);
});

/*
Creiamo il nostro blog personale e giorno dopo giorno lo potremo arricchire con nuove funzionalità sulla base di quello che impareremo. 

- Creiamo il progetto base con una rotta `/` che ritorna un testo semplice con scritto ”Server del mio blog”
- Creiamo un array dove inserire una lista di almeno 5 post, per ognuno indicare titolo, contenuto, immagine e tags (tags è un array di stringhe)
- Creiamo poi una rotta `/bacheca` che restituisca un oggetto json con la lista dei post e il conteggio, partendo da un array.
- Configuriamo gli asset statici sull’applicazione in modo che si possano visualizzare le immagini associate ad ogni post.
- Testare su postman

*/
