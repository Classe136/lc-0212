/*
*Milestone 1*
Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS e riproducendo una singola fotografia (usiamo una qualunque immagine a piacimento)
*Milestone 2*
Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
https://jsonplaceholder.typicode.com/photos?_limit=6
Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.
*Milestone 3*
Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!
*Bonus*
rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata

`
<figure>
  <img src="img/pin.svg" alt="pin" class="pin">
  <img src="./img/1.svg" alt="Trulli">
  <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
</figure>
`;

*/

//api url
//const baseUrl = "https://jsonplaceholder.typicode.com/";
const baseUrl = "http://localhost:3000/";

// endpoint
const resource = {
  photos: "photos",
  todos: "todos",
  posts: "posts",
  pizzas: "pizzas",
};

//api params
const params = { _limit: 6 };
const params2 = { min: 1, max: 10 }; //?min=1&max=10

const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");
const overlay = document.getElementById("overlay");
overlay.classList.add("d-none"); //aggiungere all'html
const imgOverlay = overlay.querySelector("img");
const closeBtn = document.querySelector("#overlay button");
closeBtn.addEventListener("click", () => {
  overlay.classList.add("d-none");
});

getData(resource.pizzas, params2);
function getData(resource, params) {
  axios
    .get(baseUrl + resource, { params })
    .then(readData)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        loader.classList.add("d-none");
      }, 2000);
    });
}

function readData(res) {
  console.log(res.data);
  const photos = res.data.data;
  const template = photos.forEach((photo) => {
    const { id, name: title, image: url } = photo;
    const figure = drawFigure(id, title, url, photos);
    gallery.appendChild(figure);
  });
  form.addEventListener("submit", () => {
    const newPhoto = {
      id: inputId.value,
      url: inputUrl.value,
      title: inputTitle.value,
    };
    photos.push(newPhoto);
    const figure = drawFigure(
      newPhoto.id,
      newPhoto.title,
      newPhoto.url,
      photos
    );
    gallery.appendChild(figure);
  });
}

function drawFigure(id, title, url, arr) {
  const figure = document.createElement("figure");
  figure.setAttribute("id", id);
  const template = `
          <img src="img/pin.svg" alt="pin" class="pin">
          <img src="${url}" alt="${title}">
          <figcaption>${title}</figcaption>
        
  `;
  figure.innerHTML = template;
  figure.addEventListener("click", function (event) {
    // console.log(event.currentTarget);
    // console.log(event.target);
    //console.log(figure.id);
    overlay.classList.remove("d-none");
    // const img = figure.querySelector("img");
    //console.log(img);
    const photo = arr.find((el) => el.id === parseInt(figure.id));
    console.log(photo);
    //imgOverlay.src = img.src;
    imgOverlay.src = photo.image;
    imgOverlay.alt = photo.name;
  });
  const button = document.createElement("button");
  button.textContent = "Cancella";
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    figure.remove();
    const index = photos.findIndex((el) => {
      return el.id === id;
    });
    if (index !== -1) {
      arr.splice(index, 1);
      console.log(arr);
    }
  });
  figure.appendChild(button);
  return figure;
}

// function getFigures(p) {
//   const figures = document.querySelectorAll("figure");
//   //console.log(figures);
//   figures.forEach((figure) => {
//     //console.log(figure);
//     figure.addEventListener("click", function (event) {
//       // console.log(event.currentTarget);
//       // console.log(event.target);
//       //console.log(figure.id);
//       overlay.classList.remove("d-none");
//       // const img = figure.querySelector("img");
//       //console.log(img);
//       const photo = p.find((el) => el.id === parseInt(figure.id));
//       console.log(photo);
//       //imgOverlay.src = img.src;
//       imgOverlay.src = photo.url;
//       imgOverlay.alt = photo.title;
//     });
//   });
// }

// async function getData() {
//   const res = await axios.get(baseUrl + resource, { params });
//   console.log("Data from async", res.data);
// }

// getData();
