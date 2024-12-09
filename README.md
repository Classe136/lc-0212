# lc-0212 - Node Express

## Step 1
```bash
# create file server.js
ni server.js

#init 
npm init -y

# create env file
ni .env

# add in env PORT = 3000
# configure package json with dev and start script (env e watch)

```
```json
"scripts": {
    "start": "node --env-file=.env server.js",
    "dev": "node --env-file=.env --watch server.js"
  }
```

```bash
# install express 
npm install express

```

```javascript
// import express in server js

const express = require("express");

// create a server instance
const app = express();

// set costant to port
const port = process.env.PORT || 3000;

//definisco path per asset statici
// creo cartella public in root directory
app.use(express.static("public"));


//add root route
app.get("/", (req, res) => {
  res.send("Home Page");
});


//mmetto il server in ascolto su localhost alla porta 3000
app.listen(port,  () => {
    console.log(`Server is running on http://localhost:${port}}`);
});

```

```bash
# launch server to test 
npm run dev 

```

## Step 2

```bash
# creo cartelle 
mkdir routes
mkdir middlewares
mkdir controllers
mkdir classes
mkdir models
mkdir views

# creo models data
 cd models
 ni example.js

# creo example controller
cd controllers
ni exampleController.js
```

```bash
 # creo first example route
 cd routes
 ni example.js

```