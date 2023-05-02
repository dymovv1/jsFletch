
"use strict";

const apiKey = "5a7411ae33c02e61a10837fe90d7fe85";
const searchInput = document.getElementById("search-input");
const typeSelect = document.getElementById("type-select");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results");

function search() {
const query = searchInput.value;
const type = typeSelect.value;

if (query.trim() === "") {
alert("Введіть назву фільму/серіалу");
return;
}

resultsContainer.innerHTML = "";

const url = type && type !== 'Обери тип :' ?
  `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}&media_type=${type}&page=1` :
  `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}&media_type=tv&page=1`;


fetch(url)
.then((response) => response.json())
.then((data) => {
if (data.results.length === 0) {
alert("Нічого не знайдено");
return;
}

const items = data.results.filter(item => item.media_type === type).slice(0, 10);
const resultsHtml = items
  .map((item) => {
    return `
    <div>
      <h3>${item.title || item.name}</h3>
      <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">
      <p>Рік: ${item.release_date || item.first_air_date}</p>
      <p>Тип: ${item.media_type}</p>
      <p>IMDb ID: ${item.id}</p>
    </div>
    `;
  })
  .join("");


resultsContainer.innerHTML = resultsHtml;
})
.catch((error) => {
alert("Під час виконання запиту сталася помилка");
console.error(error);
});

}

searchButton.addEventListener("click", search);
typeSelect.addEventListener("change", search);