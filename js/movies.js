// const body = document.body
// const slides = document.querySelectorAll('.slide')
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c2889cc86dd419cc14d3a51ac7836fc9&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
//  api url gives you a lot of results but we put &page=1
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=c2889cc86dd419cc14d3a51ac7836fc9&query="';
const body = document.querySelector('body')
const main = document.getElementById('main');
const movies = document.getElementById('movies');
const form = document.getElementById('form');
const secondForm = document.getElementById('second-form');
const search = document.getElementById('search');
const secondSearch = document.getElementById('second-search');
const sliderContainer = document.querySelector('.slider-container');


let activeSlide = 0;





// GET initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);

  // const slides = document.querySelectorAll('.slide');

  // setActiveSlide(slides);
}

function showMovies(moviesData) {

  movies.innerHTML = '';


  if (moviesData.length === 0) {
    movies.innerHTML = '<p class="error"> It looks like your search query has no relevant results. Please try something else!</p>'
  }
  moviesData.forEach((movie) => {
    const { title, poster_path, vote_average, overview, adult } = movie;



    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    // IF WILL NEED TO ADD SPAN BACK
    // <span class="${getClassByRate(vote_average)}">${vote_average % 1 == 0 ? vote_average.toFixed(1) : vote_average}</span>

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
                <i class="fas fa-info movie-btn-inf outline"></i>
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

// Submit and search (main window)
form.addEventListener('submit', (e) => {

  // console.log('Submited!!!')
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});

// Hamburger search
secondForm.addEventListener('submit', (e) => {

  // console.log('Submited!')
  e.preventDefault();

  const searchTerm = secondSearch.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    secondSearch.value = '';
  } else {
    window.location.reload();
  }
});


// Overview Open and Close 
movies.addEventListener('click', (e) => {
  // e.preventDefault()


  if (e.target.classList.contains('movie-btn-inf')) {
    e.target.parentElement.parentElement.nextElementSibling.classList.add('overview-up')
  }

  if (e.target.classList.contains('fa-window-close')) {
    e.target.parentElement.className = 'overview'
  }
  // e.target.parentElement.parentElement.nextElementSibling.classList.add('overview-up')
})

// Get ticket to the LS

// body.addEventListener('click', (e) => {
//   // e.preventDefault();

//   if (e.target.classList.contains('btn')) {

//     // console.log(e.target.parentElement.previousElementSibling.firstElementChild.innerText)

//     const searchTerm = e.target.parentElement.previousElementSibling.firstElementChild.innerText;

//     localStorage.setItem('booking-movie', searchTerm)

//     // if (searchTerm && searchTerm !== '') {
//     //   getMoviesSearch(SEARCH_API + searchTerm);
//     // }

//   }
// })

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






// const checkBox = document.querySelector('.toggler')

// checkBox.addEventListener('click', (e) => {
//   console.log(checkBox.checked)
// })

// search.addEventListener('keyup', (e) => {
//   console.log(e.target.value)
// })

// CASE OF UNIQUE FORM

// function validate_sendForm(_id) {

//   var formEl = document.getElementById(_id);
//   console.log(formEl)
//   formEl.addEventListener('submit', (e) => {
//     e.preventDefault()

//     console.log('Submited!')
//   })

//   // if you changed the input's id to class..:
//   // var inptEl_textOld = formEl.querySelector("input.text_old");
//   // var inptEl_sinType = formEl.querySelector("input.sin_type");
//   // var inptEl_den     = formEl.querySelector("input.den");
//   // ...
// }



// CASE TO ADD THE SECOND UNIQUE FUNCTION

// const uniqueCheck = document.querySelector('.uniqueCheck')
// console.log(uniqueCheck)

// if (checkBox.checked) {
//   console.log(true)

// uniqueCheck.addEventListener('keyup', (e) => {
//   console.log(e.target.value)
// })

// }

