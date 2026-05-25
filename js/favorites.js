// ================= AUTH =================

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!currentUser) {
  window.location.href = "login.html";
}

// ================= LOGOUT =================

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");

  window.location.href = "login.html";
});

// ================= FAVORITES =================

const favoritesGrid = document.getElementById("favoritesGrid");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

displayFavorites();

function displayFavorites() {
  favoritesGrid.innerHTML = "";

  if (favorites.length === 0) {
    favoritesGrid.innerHTML = "<h2>No favorite movies yet</h2>";

    return;
  }

  favorites.forEach(function (movie) {
    favoritesGrid.innerHTML += `

<div class="movie-card">

<img
src="${movie.poster}"
alt="${movie.title}"
>

<div class="movie-info">

<h3>${movie.title}</h3>

<p>${movie.year}</p>

<button
class="remove-btn"
data-id="${movie.id}"
>

Remove

</button>

</div>

</div>

`;
  });

  addRemoveEvents();
}

function addRemoveEvents() {
  const removeBtns = document.querySelectorAll(".remove-btn");

  removeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const movieId = btn.dataset.id;

      favorites = favorites.filter(function (movie) {
        return movie.id !== movieId;
      });

      localStorage.setItem("favorites", JSON.stringify(favorites));

      displayFavorites();
    });
  });
}
