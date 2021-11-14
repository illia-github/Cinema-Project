const body = document.querySelector('body')
const container = document.querySelector('.container');
const mainContainer = document.querySelector('.main-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=c2889cc86dd419cc14d3a51ac7836fc9&query="';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const heading = document.querySelector('.heading')
const poster = document.querySelector('.left-column')

// populateUI();

let ticketPrice = +movieSelect.value;


// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {

  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}



// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = `$${isNaN(+selectedSeatsCount * ticketPrice) ? 0 : +selectedSeatsCount * ticketPrice}`;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  console.log(typeof e.target.value)
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();

  }
});

// Initial count and total set
updateSelectedCount();

const next = document.querySelector('.nextBtn')


// Next(get ticket)
next.addEventListener('click', (e) => {


  // Check if date, time and seat is picked

  if (e.target.classList.contains('nextBtn')) {
    // Fail
    if ($("#datepicker").datepicker("getDate") === null || isNaN(ticketPrice) || JSON.parse(localStorage.getItem('selectedSeats')).length === 0) {
      e.preventDefault()
      console.log('Please pick: time, date & seats!')



      const alert = document.createElement('div')
      alert.className = 'alert fail'
      alert.innerHTML = `
      <span class="closebtn" onclick="this.parentElement.style.display='none';"><i class="fas fa-times"></i></span> 
        Please pick: time, date & seats!
      `
      mainContainer.appendChild(alert)
      mainContainer.classList.add('overlay')

    } else {
      // Success
      console.log('Booked, Enjoy the movie')

      const alert = document.createElement('div')
      alert.className = 'alert success'
      alert.innerHTML = `
      <span class="closebtn" onclick="this.parentElement.style.display='none';"><i class="fas fa-times"></i></span> 
          Booked, Enjoy the movie!
      `
      mainContainer.appendChild(alert)
      mainContainer.classList.add('overlay')


    }
  }
})

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-times')) {
    console.log('Is ok ')
    e.target.parentElement.remove()
    mainContainer.classList.remove('overlay')
  }
})



// Time picker
$(document).ready(function () {
  $('select').awselect({
    background: "var(--tetriary)",

    active_background: "#fff",
    placeholder_color: "#fff",
    placeholder_active_color: "#0f37a9",

    option_color: "#405463",
    vertical_padding: "5px",
    horizontal_padding: "5px",
    immersive: false
  })
});


// Date picker
$(function () {
  $("#datepicker").datepicker({
    dateFormat: "dd.mm.yy",
  });
});





// Callbacks
// Additionally you may want to add callbacks to handle what happens when the user selects an option.
// Add the data-callback attribute followed by your callback function.
// <select name="food_selector" data-callback="my_callback" data-placeholder="Select a food to eat" >
//     ...
// The callback function should be placed outside $(document).ready(). The function can also access the value that was chosen by the user.
// $(document).ready(function(){
//    ...
// })

// function my_callback(value){
//     alert("The value selected is " + value)
// }



function my_callback(value) {

  console.log(value)
  ticketPrice = +value;

  setMovieData(value.selectedIndex, value);
  updateSelectedCount();
}



// Set movie from LS

initMovie()

function initMovie() {
  const bookingMovie = localStorage.getItem('booking-movie')

  if (bookingMovie && bookingMovie !== '') {
    getMovies(SEARCH_API + bookingMovie);
  }
}

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(moviesData) {

  const { title, poster_path } = moviesData[0]

  heading.innerHTML = title
  poster.innerHTML = `<img src="${poster_path !== null ? IMG_PATH + poster_path : '/image/default-movie.jpg'}" alt="">`
}


