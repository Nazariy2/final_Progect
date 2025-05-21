const API_URL = "https://api.spaceflightnewsapi.net/v4/articles";
const pageSize = 6;

let currentPage = 1;
let allPosts = [];
let filteredPosts = [];
let isSearching = false;

const postsContainer = document.getElementById("postsContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const showLessBtn = document.getElementById("showLessBtn");
const spinner = document.getElementById("spinner");
const searchInput = document.getElementById("searchInput");

async function fetchPosts(page = 1) {
  showSpinner(true);
  const res = await fetch(`${API_URL}?limit=${pageSize}&offset=${(page - 1) * pageSize}`);
  const data = await res.json();
  showSpinner(false);

  if (page === 1) {
    allPosts = data.results;
  } else {
    allPosts = allPosts.concat(data.results);
  }

  filteredPosts = allPosts;
  renderPosts(filteredPosts);
  updateShowLessBtn();
}

function renderPosts(posts) {
  postsContainer.innerHTML = "";
  posts.forEach(post => {
    postsContainer.innerHTML += createCard(post);
  });
}

function appendPosts(posts) {
  posts.forEach(post => {
    postsContainer.innerHTML += createCard(post);
  });
}

function createCard(post) {
  return `
    <div class="col-md-6 col-lg-4 ">
      <div class="card h-100 bg-dark text-white">
        <img src="${post.image_url}" class="card-img-top" alt="${post.title}">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.summary.slice(0, 100)}...</p>
          <a href="${post.url}" target="_blank" class="btn btn-primary">Read</a>
        </div>
      </div>
    </div>
  `;
}

function showSpinner(show) {
  spinner.style.display = show ? "inline-block" : "none";
}

function updateShowLessBtn() {
  showLessBtn.style.display = currentPage > 1 ? "inline-block" : "none";
}

loadMoreBtn.addEventListener("click", () => {
  if (isSearching) return;
  currentPage++;
  fetchPosts(currentPage);
  updateShowLessBtn();
});

showLessBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;

  currentPage--;
  const postsToShow = allPosts.slice(0, currentPage * pageSize);
  filteredPosts = postsToShow;
  renderPosts(postsToShow);
  updateShowLessBtn();
});

searchInput.addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  isSearching = query.length > 0;

  if (isSearching) {
    filteredPosts = allPosts.filter(post => post.title.toLowerCase().includes(query));
    renderPosts(filteredPosts);
  } else {
    renderPosts(allPosts);
  }
});

fetchPosts();


// Primo caricamento
fetchPosts();

//api date space station
async function updateISSData() {
  try {
    const res = await fetch("http://api.open-notify.org/iss-now.json");
    const data = await res.json();
    const { latitude, longitude } = data.iss_position;
    document.getElementById(
      "iss-data"
    ).textContent = `Latitudine: ${latitude}, Longitudine: ${longitude}`;
  } catch (err) {
    document.getElementById("iss-data").textContent =
      "Error loading data from ISS.";
  }
}
updateISSData();
setInterval(updateISSData, 5000);
