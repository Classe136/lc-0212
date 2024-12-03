const express = require("express");
const app = express();
const PORT = 3000;

const pizzasRouter = require("./routers/pizzas");
const petsRouter = require("./routers/pets");

//definisco dove sono gli asset statici
app.use(express.static("public")); //http://localhost:3000/toys....

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
  res.status(404).send("<h1>Error 404 - Not Found !</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}}`);
});
/*
Usando l'array dei post fornito con le relative immagini, creare un file di routing (`routers/posts.js`) che conterrà le rotte necessario per l'entità `post`.

All'interno creare le rotte per le operazioni CRUD (*Index, Show, Create, Update e Delete)*

Tutte le risposte saranno dei testi che confermeranno l’operazione che il server deve eseguire, secondo le convenzioni REST.

Ad esempio: 

Se viene chiamata `/posts` col verbo `GET` ci aspettiamo “Lista dei post”;

Se viene chiamato `/posts/1` col verbo `DELETE` ci aspettiamo “Cancellazione del post 1”

e via dicendo…  

Registrare il router dentro `app.js` con il prefisso `posts/`.

### Bonus

- Provare a restituire la lista dei post dalla rotta *index*, in formato `json`
- Provare a restituire un singolo post dalla rotta *show,* sempre in formato `json`



*/
