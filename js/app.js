// ================= USER AUTH =================

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

// Protect homepage
if (!currentUser) {
  window.location.href = "login.html";
}

// Welcome text
const welcomeText = document.getElementById("welcomeText");

welcomeText.textContent = `Hi, ${currentUser.username}`;

// Logout
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");

  window.location.href = "login.html";
});

// ================= MOVIE SEARCH =================

const searchBtn = document.getElementById("searchBtn");

const searchInput = document.getElementById("searchInput");

const movieGrid = document.getElementById("movieGrid");

// Replace with your OMDb API key
const API_KEY = "cdea7410";

// Fetch movie data
async function fetchMovies(movieName) {
  try {
    movieGrid.innerHTML = "<h2>Loading...</h2>";

    const response = await fetch(
      `https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`,
    );

    const data = await response.json();

    displayMovies(data.Search);
  } catch (error) {
    console.log("Error:", error);

    movieGrid.innerHTML = "<h2>Something went wrong</h2>";
  }
}

// Display movie cards
function displayMovies(movies) {
  movieGrid.innerHTML = "";

  if (!movies) {
    movieGrid.innerHTML = "<h2>No movies found</h2>";

    return;
  }

  movies.forEach(function (movie) {
    movieGrid.innerHTML += `

    <div class="movie-card">

        <img src="${movie.Poster}" alt="${movie.Title}">

        <div class="movie-info">

            <div class="movie-header">

                <h3>${movie.Title}</h3>

                <button
                class="fav-btn"
                data-id="${movie.imdbID}"
                data-title="${movie.Title}"
                data-year="${movie.Year}"
                data-poster="${movie.Poster}"
                >
                ❤️
                </button>

            </div>

            <p>${movie.Year}</p>

        </div>

    </div>

    `;
  });

  addFavoriteEvents();
}

// ================= FAVORITES =================

function addFavoriteEvents() {
  const favBtns = document.querySelectorAll(".fav-btn");

  favBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const movie = {
        id: btn.dataset.id,
        title: btn.dataset.title,
        year: btn.dataset.year,
        poster: btn.dataset.poster,
      };

      saveFavorite(movie);
    });
  });
}

function saveFavorite(movie) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const alreadyExists = favorites.some(function (item) {
    return item.id === movie.id;
  });

  if (alreadyExists) {
    alert("Movie already in favorites");

    return;
  }

  favorites.push(movie);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  alert("Movie added to favorites ❤️");
}

// ================= SEARCH EVENT =================

searchBtn.addEventListener("click", function () {
  const movieName = searchInput.value.trim();

  if (movieName === "") {
    alert("Please enter a movie name");

    return;
  }

  fetchMovies(movieName);
});

// Search on Enter key
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Default movies
fetchMovies("Avengers");
