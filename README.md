# lc-0212 - Node Express

## Step
```bash
# create file server.js
# npm init -y
# configure package json with dev and start script

# install express 
npm install express

```

```javascript
// import express in server js

const express = require('express');


// set port to listen on localhost
const PORT = 3000;

const app = express();

app.use(express.static("public"));

const pets = require("./data/pets.js");
console.log(pets);

app.get("/", (req, res) => {
  res.send("Ciao");
});
// app.get("/api/pets", (req, res) => {
//   res.json(pets);
// });
app.all('*',(req,res)=>{
  res.status(404).send('<h1>Not Found !</h1>');
})
app.listen(PORT,  () => {
    console.log(`Server is running on http://localhost:${PORT}}`);
});

```