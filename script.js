








onst resultNav = document.getElementById('resultNav');
const favoritesNav = document.getElementById('favoritesNav');
const imageContainer = document.querySelector('.images-conatiner');
const saveConfirmed = document.querySelector('.save-confirmed"');
const loader = document.querySelector('.loader');


//API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultArray = [];

function updateDOM() {
    resultArray.forEach((result) => {
        const card = document.createElement('div');
        card.classList.add('card');
        //Link
        const link = document.createElement('a');
        link.href = result.hdurl;
    });
}

//get ymg from API
async function getNasaPicture() {
    try{
        const response = await fetch(apiUrl);
        resultArray = await response.json();
        console.log(resultArray);
        updateDOM();
    } catch(error) {
        //error
    }
}

//OnLoad
getNasaPicture();