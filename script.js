const resultNav = document.getElementById("resultNav");
const favoritesNav = document.getElementById("favoritesNav");
const imageContainer = document.querySelector(".images-conatiner");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

//API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultArray = [];
let favorites = {}; //its more easy to delete and search items insted of loop each item in array. we can delete and search item through a key!

function createDOMNodea(page) {
  const currentArray =
    page === "result" ? resultArray : Object.values(favorites);
  console.log(page, currentArray);
  currentArray.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("card");
    //Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View full img";
    link.target = "_blank";
    //image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    //card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    //card title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    //add to fav
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.classList.add("addHeart");
    if (page === "result") {
      saveText.textContent = "Add To Favorites";
      saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    } else {
      saveText.textContent = "Remove Favorites";
      saveText.setAttribute("onclick", `removeFavorite('${result.url}')`);
    }
    //card text
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = result.explanation;
    //footer container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    //date
    const date = document.createElement("strong");
    date.textContent = result.date;
    //copyRightText
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = `    ${copyrightResult}`;
    //Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imageContainer.appendChild(card);
  });
}

function updateDOM(page) {
  //get from localStorage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
    console.log("fav", favorites);
  }
  imageContainer.textContent = '';
  createDOMNodea(page);
}

//get ymg from API
async function getNasaPicture() {
  try {
    const response = await fetch(apiUrl);
    resultArray = await response.json();
    updateDOM("fav");
  } catch (error) {
    //error
  }
}

//Add to Favorites
function saveFavorite(itemUrl) {
  resultArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      //show Save confirmation for 2 second
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);

      //set in localStorage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

//remove favorties
function removeFavorite(itemUrl) {
    if(favorites[itemUrl]) {
        delete favorites[itemUrl];

        //set in localStorage
        localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
        updateDOM('favorites');
    }
}


//OnLoad
getNasaPicture();
