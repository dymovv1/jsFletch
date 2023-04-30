 "use strict"
 
 const apiKey = 'c5a8d846';
  const searchInput = document.getElementById('search-input');
  const typeSelect = document.getElementById('type-select');
  const searchButton = document.getElementById('search-button');
  const resultsContainer = document.getElementById('results');

  function search() {
    const query = searchInput.value;
    const type = typeSelect.value;

    if (query.trim() === '') {
      alert('Введіть назву фільму/серіалу');
      return;
    }

    if (type === '') {
      alert('Оберіть тип фільму/серіалу');
      return;
    }

    resultsContainer.innerHTML = '';

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=${type}`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'False') {
          alert('Нічого не знайдено');
          return;
        }

        const resultsHtml = data.Search.map(item => {
          return `
            <div>
              <h3>${item.Title}</h3>
              <img src="${item.Poster}">
              <p>Рік: ${item.Year}</p>
              <p>Тип: ${item.Type}</p>
              <p>IMDb ID: ${item.imdbID}</p>
            </div>
          `;
        }).join('');

        resultsContainer.innerHTML = resultsHtml;
      })
      .catch(error => {
        alert('Під час виконання запиту сталася помилка');
        console.error(error);
      });
  }

  searchButton.addEventListener('click', search);