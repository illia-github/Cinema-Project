const body = document.querySelector('body')

const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c2889cc86dd419cc14d3a51ac7836fc9&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=c2889cc86dd419cc14d3a51ac7836fc9&query="';

const main = document.getElementById('main');
const movies = document.getElementById('movies');
const form = document.getElementById('form');
const secondForm = document.getElementById('second-form');
const search = document.getElementById('search');
const secondSearch = document.getElementById('second-search');
const sliderContainer = document.querySelector('.slider-container');
const mainSection = document.querySelector('.main');


let activeSlide = 0;

// Arrow scroller
rightBtn.addEventListener('click', () => {
  activeSlide++;

  const slides = document.querySelectorAll('.slide');

  if (activeSlide > slides.length - 1) {
    activeSlide = 0;
  }

  setActiveSlide(slides);
});

leftBtn.addEventListener('click', () => {
  const slides = document.querySelectorAll('.slide');

  if (activeSlide === 0) {
    activeSlide = slides.length - 1;
  } else if (activeSlide > 0) {
    activeSlide--;
  }

  setActiveSlide(slides);
});

// Set active slide
function setActiveSlide(slides) {
  slides.forEach((slide) => slide.classList.remove('active'));

  slides[activeSlide].classList.add('active');
}


// GET initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);

  const slides = document.querySelectorAll('.slide');

  setActiveSlide(slides);
}

function showMovies(moviesData) {
  console.log(moviesData);
  // movies.innerHtml = '';
  // sliderContainer.innerHTML = ''

  moviesData.forEach((movie) => {
    const { title, poster_path, vote_average, overview, adult } = movie;

    // Adding slides
    const movieSlide = document.createElement('div');
    movieSlide.classList.add('slide');
    movieSlide.innerHTML = `
    <div class='column1'>
      <img src="${IMG_PATH + poster_path}" alt="${title}">
    </div>
    <div class='column2'>
      <div>
        <h1>${title}</h1>  
        <p>${overview}</p>
      </div>
      <div>  
        <p class="rating-age outline">${adult === false ? '16+' : '18+'}</p>
        <p class="${getClassByRate(
      vote_average
    )} rating-movie outline">${vote_average % 1 == 0 ? vote_average.toFixed(1) : vote_average}</p>
        <a href="/booking.html" class="btn outline get-ticket">Get ticket</a>
      </div>
    </div>
    `;


    sliderContainer.prepend(movieSlide);
  });
}


// Add movies using search
async function getMoviesSearch(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results)
  showMoviesSearch(data.results);
}

function showMoviesSearch(moviesData) {

  let movies

  if (movies !== undefined) {
    movies.innerHTML = '';
  } else {
    movies = document.createElement('div')
    movies.classList.add("movies");
    movies.setAttribute('id', 'movies');

    const container = document.createElement('div')
    container.classList.add("container");
    container.setAttribute('id', 'movies-container');
    container.innerHTML = `
    <div class="news-promos "><h2>Search Results</h2></div>
    <section class="movies" id="movies"></section>`

    container.appendChild(movies)

    main.appendChild(container)
    main.className = 'movies-main'
  }

  if (moviesData.length === 0) {
    movies.innerHTML = '<p class="error"> It looks like your search query has no relevant results. Please try something else!</p>'
  }


  moviesData.forEach((movie) => {
    const { title, poster_path, vote_average, overview, adult } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
    <div class="movie-img">
    <img src="${poster_path !== null ? IMG_PATH + poster_path : '/image/default-movie.jpg'}" alt="${title}">
  </div>
  <div class="movie-info">
    <div>
      <h3>${title}</h3>
    </div>
      <div>
        <a href="/booking.html" class="movie-btn-tkt outline get-ticket">Get ticket</a>
        <i class="fas fa-info movie-btn-inf outline get-ticket"></i>
      </div>
  </div>
  <div class="overview">
    <i class="far fa-window-close fa-2x"></i>
    <h3>Overview</h3>
   ${overview}
  </div>
    `;

    movies.appendChild(movieEl);
  });
}


function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

const container = document.querySelector('.container')

// Submit and search action (main window)
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMoviesSearch(SEARCH_API + searchTerm);

    search.value = '';
    container.remove()
    if (sliderContainer !== undefined && mainSection !== undefined) {
      sliderContainer.remove()
      mainSection.remove()
    }
    if (document.getElementById('movies-container') != null) {
      document.getElementById('movies-container').remove()
    }

  } else {
    window.location.reload();
  }
});



// Hamburger search
secondForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = secondSearch.value;

  if (searchTerm && searchTerm !== '') {
    getMoviesSearch(SEARCH_API + searchTerm);

    secondSearch.value = '';
    container.remove()
    if (sliderContainer !== undefined && mainSection !== undefined) {
      sliderContainer.remove()
      mainSection.remove()
    }
    if (document.getElementById('movies-container') != null) {
      document.getElementById('movies-container').remove()
    }

  } else {
    window.location.reload();
  }
});


// Overviev and get ticket buttons 
body.addEventListener('click', (e) => {
  // e.preventDefault();

  // Get tickets 
  if (e.target.classList.contains('get-ticket')) {
    const searchTerm = e.target.parentElement.previousElementSibling.firstElementChild.innerText;

    localStorage.setItem('booking-movie', searchTerm)
  }

  // Open overview
  if (e.target.classList.contains('movie-btn-inf')) {
    e.target.parentElement.parentElement.nextElementSibling.classList.add('overview-up')
  }

  // Close overview
  if (e.target.classList.contains('fa-window-close')) {
    e.target.parentElement.className = 'overview'
  }
})





