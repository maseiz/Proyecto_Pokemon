const hamburgerButton = document.querySelector('.boton');
const menuHamburguesa = document.querySelector('.menu');

hamburgerButton.addEventListener('click', () => {
menuHamburguesa.classList.toggle('menu-hidden');
});


const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");

let offset = 1;
let limit = 11;

previous.addEventListener("click", () => {
    if (offset !=1) {
        offset -= 10;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    }
   })

next.addEventListener("click", () => {
    offset += 10;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
})


function fetchPokemon (id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then(data => {
        createPokemon(data);
        spinner.style.display = "none";
});
}

function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }
}

function createPokemon(pokemon){
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement('div'); 
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;
    
    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");

    cardBack.appendChild(progressBars(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}
    function progressBars(stats){
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    for (let i = 0; i < 3; i++) {
        const stat  = stats[i];

        const statPercent = stat.base_state / 2 + "%";
        const statContainer = document.createElement("div");
        statContainer.classList.add("stat-container");

        const statName = document.createElement("div");
        statName.textContent = stat.stat.name;

        const progress = document.createElement("div");
        progress.classList.add("progress");

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);
        statsContainer.appendChild(statContainer);
    }

    return statsContainer; 
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
   }
}

fetchPokemons(offset, limit);

// BUSCADOR
// Obtén los elementos HTML necesarios
const searchForm = document.querySelector('form');
const searchInput = document.getElementById('busqueda');
const searchResults = document.getElementById('search-results');
 // Agrega un evento de escucha al formulario para la búsqueda cuando se envíe
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que se recargue la página al enviar el formulario
  performSearch();
});
 async function performSearch() {
  const query = searchInput.value.trim();
   if (query.length === 0) return; // Salir si el valor de búsqueda es vacío
   showSpinner();
   const pokemonData = await searchPokemon(query);
   if (pokemonData) {
    displayPokemon(pokemonData);
    
  } else {
    displayNoResults();
  }
   hideSpinner();
}







 async function searchPokemon(query) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon data:', error.message);
  }
   return null;
}
 function displayPokemon(pokemonData) {
  searchResults.innerHTML = `
    <div class="card">
      <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name} image">
      <h3>${pokemonData.name.toUpperCase()}</h3>
      <p>ID: ${pokemonData.id}</p>
      <a href="index.html">
      <button class="volver" type="submit">
                <img src="/img/005.png" alt="Pokédex"><p>Volver</p></img>
      </button>
      </a>
    </div>
    `;
    const pagination = document.querySelector('.pagination');
    pagination.style.display = 'none';
}
 function displayNoResults() {
  searchResults.innerHTML = `
    <div class="no-results">
      <p>No se encontraron resultados.</p>
      <a href="index.html">
      <button class="volver" type="submit">
                <img src="/img/005.png" alt="Pokédex"><p>Volver</p>
            </button>
      </a>
    </div>
  `;
  const noResults = document.querySelector('.pagination');
    noResults.style.display = 'none';
}
 function showSpinner() {
  spinner.style.display = 'block';
}
 function hideSpinner() {
  spinner.style.display = 'none';
}
 // Realiza una búsqueda inicial
performSearch();