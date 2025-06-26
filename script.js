const apikey = 'cbbc567a';
let selectedRegion = 'all';
const searchinput = document.getElementById('searchinput');
const searchbtn = document.getElementById('searchbtn');
const recmovielist = document.getElementById('rec-movie-list');
const favoritesList = document.getElementById('favouriteslist');

const trendingKeywords = {
  all: [
    "Inside Out 2",
    "Furiosa: A Mad Max Saga",
    "Kingdom of the Planet of the Apes",
    "Joker: Folie à Deux",
    "Deadpool & Wolverine",
    "Pushpa 2: The Rule",
    "Kalki 2898 AD",
    "The Fall Guy",
    "Bade Miyan Chote Miyan",
    "Godzilla x Kong: The New Empire"
  ],
  hollywood: [
    "Inside Out 2",
    "Furiosa: A Mad Max Saga",
    "Kingdom of the Planet of the Apes",
    "Joker: Folie à Deux",
    "Deadpool & Wolverine",
    "The Fall Guy",
    "Godzilla x Kong: The New Empire"
  ],
  bollywood: [
    "Pushpa 2: The Rule",
    "Kalki 2898 AD",
    "Bade Miyan Chote Miyan",
    "Singham Again",
    "The Crew",
    "Shaitaan",
    "Bhool Bhulaiyaa 3",
    "Stree 2",
    "Chandu Champion",
    "Mr. and Mrs. Mahi",
    "Toxic",
    "Jigra",
    "Metro In Dino",
    "Emergency",
    "Sarfira"
  ]
};



const genres = {
  action: {
    all: [
      "Jawan", "Pathaan", "Shershaah", "Singham Again", "Bade Miyan Chote Miyan",
      "Tiger 3", "War", "Sooryavanshi", "Ek Tha Tiger",
      "John Wick: Chapter 4", "Mission: Impossible – Dead Reckoning",
      "The Equalizer 3", "Extraction 2", "Fast X", "The Marvels",
      "The Batman", "Black Panther: Wakanda Forever", "The Suicide Squad"
    ],
    hollywood: [
      "John Wick: Chapter 4", "The Equalizer 3", "Extraction 2", "Fast X",
      "The Marvels", "The Batman", "Black Panther: Wakanda Forever",
      "The Suicide Squad", "Mission: Impossible – Dead Reckoning",
      "Top Gun: Maverick", "Bullet Train"
    ],
    bollywood: [
      "Jawan", "Pathaan", "Shershaah", "Singham Again", "Tiger 3",
      "Bade Miyan Chote Miyan", "War", "Sooryavanshi", "Ek Tha Tiger",
      "Raees", "Batla House", "Commando 3"
    ]
  },

  comedy: {
    all: [
      "The Crew", "Dream Girl 2", "Bhediya", "OMG 2", "Thank God", "Govinda Naam Mera",
      "Barbie", "No Hard Feelings", "Free Guy", "Wonka", "The Lost City",
      "Ticket to Paradise", "Mr. Bean's Holiday", "Luka Chuppi", "Good Newwz",
      "Pati Patni Aur Woh", "Total Dhamaal", "Housefull 4"
    ],
    hollywood: [
      "Barbie", "No Hard Feelings", "Free Guy", "Wonka", "The Lost City",
      "Ticket to Paradise", "The Intern", "Game Night", "Mr. Bean's Holiday",
      "Central Intelligence", "We're the Millers"
    ],
    bollywood: [
      "The Crew", "Dream Girl 2", "Bhediya", "OMG 2", "Thank God",
      "Govinda Naam Mera", "Luka Chuppi", "Pati Patni Aur Woh",
      "Good Newwz", "Total Dhamaal", "Housefull 4", "Fukrey Returns",
      "Welcome Back"
    ]
  },

  scifi: {
    all: [
      "Kalki 2898 AD", "Robot 2.0", "Ra.One", "Attack", "Koi Mil Gaya", "PK",
      "Avatar: The Way of Water", "Dune: Part Two", "The Creator", "65",
      "Spider-Man: Across the Spider-Verse", "The Marvels",
      "Black Panther: Wakanda Forever", "Tenet", "Minority Report",
      "Interstellar", "Inception", "Edge of Tomorrow"
    ],
    hollywood: [
      "Avatar: The Way of Water", "Dune: Part Two", "The Creator", "65",
      "Spider-Man: Across the Spider-Verse", "The Marvels",
      "Tenet", "Interstellar", "Inception", "Edge of Tomorrow",
      "Black Panther: Wakanda Forever", "The Matrix Resurrections"
    ],
    bollywood: [
      "Kalki 2898 AD", "Robot 2.0", "Ra.One", "Attack", "PK",
      "Koi Mil Gaya", "Krrish 3", "Love Story 2050", "Tumbbad"
    ]
  }
};


window.addEventListener('load', () => {
  const splash = document.getElementById('screen-splash');
  setTimeout(() => {
    splash.style.display = 'none';
  }, 3000);
});

window.addEventListener('DOMContentLoaded', () => {
  loadTrending('all');
  loadGenres('all');
  loadFavorites();
});

searchbtn.addEventListener('click', () => {
  const query = searchinput.value.trim();
  const recommendationsSection = document.getElementById('recommendations');
  if (query) {
    searchMovies(query);
  } else {
    recommendationsSection.classList.add('hidden');
  }
});


function getUniqueKeywords(arr, count = 9) {
  const set = new Set();
  while (set.size < count && set.size < arr.length) {
    const keyword = arr[Math.floor(Math.random() * arr.length)];
    set.add(keyword);
  }
  return [...set];
}

function loadRegion(region) {
   selectedRegion = region; 
  loadTrending(region);
  loadGenres(region);
}

function loadTrending(region = 'all') {
  const keywords = getUniqueKeywords(trendingKeywords[region], 9);
  const container = document.getElementById('trendingmovies');
  container.innerHTML = '';
  keywords.forEach(keyword => loadGenreMovies(keyword, 'trendingmovies'));
}

function loadGenres(region = 'all') {
  const actionKeywords = getUniqueKeywords(genres.action[region], 9);
  const comedyKeywords = getUniqueKeywords(genres.comedy[region], 9);
  const scifiKeywords = getUniqueKeywords(genres.scifi[region], 9);

  document.getElementById('actionmovies').innerHTML = '';
  document.getElementById('comedymovies').innerHTML = '';
  document.getElementById('scifimovies').innerHTML = '';

  actionKeywords.forEach(keyword => loadGenreMovies(keyword, 'actionmovies'));
  comedyKeywords.forEach(keyword => loadGenreMovies(keyword, 'comedymovies'));
  scifiKeywords.forEach(keyword => loadGenreMovies(keyword, 'scifimovies'));
}

function loadGenreMovies(keyword, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(keyword)}&apikey=${'cbbc567a'}`)
    .then(res => res.json())
    .then(data => {
      if (data.Response === 'True') {
        data.Search.forEach(movie => {
          fetchMovieDetails(movie.imdbID, container);
        });
      } else {
        const noResults = document.createElement('p');
        noResults.textContent = `No results for "${keyword}"`;
        container.appendChild(noResults);
      }
    })
    .catch(err => {
      console.error(`Error loading genre ${keyword}:`, err);
    });
}
async function searchMovies(query) {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apikey}`;
  const recommendationsSection = document.getElementById('recommendations');

  try {
    const res = await fetch(url);
    const data = await res.json();
    recmovielist.innerHTML = '';

    if (data.Response === 'True') {
      recommendationsSection.classList.remove('hidden');

      for (const movie of data.Search) {
        if (movie.Poster && movie.Poster !== 'N/A') {
          await fetchMovieDetails(movie.imdbID, recmovielist);
        }
      }
    } else {
      recommendationsSection.classList.remove('hidden');
      recmovielist.innerHTML = '<p>No Movies Found.</p>';
    }
  } catch (err) {
    console.error('Search error:', err);
    recmovielist.innerHTML = '<p>Error fetching movie data.</p>';
  }
}





async function fetchMovieDetails(imdbID, container) {
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${'cbbc567a'}`;
  try {
    const res = await fetch(url);
    const movie = await res.json();
    if (movie.Response === 'True') {
      createMovieCard(movie, container);
    }
  } catch (err) {
    console.error('Detail fetch error:', err);
  }
}

function createMovieCard(movie, container) {
  const card = document.createElement('div');
  card.classList.add('movie-card');
  card.style.height = '360px';

  const isFav = checkFavorite(movie.imdbID);
  const favClass = isFav ? 'fav-btn active' : 'fav-btn';
  const heart = isFav ? '❤️' : '🤍';

  const posterURL = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x225?text=No+Image';

  card.innerHTML = `
    <img src="${posterURL}" alt="${movie.Title}" />
    <div class="movie-info">
      <h3>${movie.Title}</h3>
      <p>${movie.Genre} | ⭐ ${movie.imdbRating}</p>
      <div class="movie-description">${movie.Plot}</div>
      <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' trailer')}" target="_blank" style="color:#e50914; text-decoration:none;">▶ Watch Trailer</a>
    </div>
    <span class="${favClass}" data-id="${movie.imdbID}">${heart}</span>
  `;

  const heartBtn = card.querySelector('.fav-btn');
  heartBtn.addEventListener('click', () => {
    toggleFavorite(movie);
    heartBtn.classList.toggle('active');
    heartBtn.textContent = heartBtn.classList.contains('active') ? '❤️' : '🤍';
    loadFavorites();
  });

  container.appendChild(card);
}

function toggleFavorite(movie) {
  let favs = JSON.parse(localStorage.getItem('favorites')) || [];
  const exists = favs.find(m => m.imdbID === movie.imdbID);

  if (exists) {
    favs = favs.filter(m => m.imdbID !== movie.imdbID);
  } else {
    favs.push(movie);
  }

  localStorage.setItem('favorites', JSON.stringify(favs));
}

function checkFavorite(imdbID) {
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];
  return favs.some(m => m.imdbID === imdbID);
}

function loadFavorites() {
  favoritesList.innerHTML = '';
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];
  favs.forEach(movie => createMovieCard(movie, favoritesList));
}
