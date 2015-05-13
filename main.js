var MOVIE_URL = 'http://www.omdbapi.com/?t=';
var FIREBASE_URL = 'https://mymovieproject.firebaseio.com/movie.json';

$.get(FIREBASE_URL, function (data) {
     Object.keys(data).forEach(function () {
      addMovieDetail(data);
   });
 });

var movieTitle = document.querySelector('.movieButton');

movieTitle.onclick = function () {

 var input = document.querySelector('#movieTitle');
 var movie = input.value;

    $.get(MOVIE_URL + movie, function(data) {
      $.post(FIREBASE_URL, JSON.stringify(data), function(res) {
      })
    });
  
  getJSON(MOVIE_URL + movie, function (data) {
   var td = document.querySelectorAll('td');
    
      var title = data.Title;
      var year = data.Year;
      var rated = data.Rated;
      var rating = data.imdbRating;
      var poster = data.Poster;
     
     $(".movieTitle").html(title)
     $(".movieYear").html(year)
     $(".movieRated").html(rated)
     $(".movieRating").html(rating)
     $(".moviePoster").html("<img src='" + poster + "'</img>")
  });
}

function addMovieDetail(data) {

  var detail = createMovieNode(data);
  var target = $('.movieContainer');

  target.empty();
  target.append(detail);
}

function createMovieNode(movie){

 var docFragment = document.createDocumentFragment(); // contains all gathered nodes

var table = document.createElement('TABLE');
table.setAttribute("align", "center");
docFragment.appendChild(table);

var tbody = document.createElement('TBODY');
table.appendChild(tbody);

var tr = document.createElement('TR');
tbody.appendChild(tr);

var th = document.createElement('TH');
tr.appendChild(th);
var text = document.createTextNode("Movie");
th.appendChild(text);

var th_0 = document.createElement('TH');
tr.appendChild(th_0);
var text_0 = document.createTextNode("Year");
th_0.appendChild(text_0);

var th_1 = document.createElement('TH');
tr.appendChild(th_1);
var text_1 = document.createTextNode("Rated");
th_1.appendChild(text_1);

var th_2 = document.createElement('TH');
tr.appendChild(th_2);
var text_2 = document.createTextNode("Release Date");
th_2.appendChild(text_2);

var tr_0 = document.createElement('TR');
tbody.appendChild(tr_0);

var td = document.createElement('TD');
tr_0.appendChild(td);
var text_3 = document.createTextNode("xx");
td.appendChild(text_3);

var td_0 = document.createElement('TD');
tr_0.appendChild(td_0);
var text_4 = document.createTextNode("xx");
td_0.appendChild(text_4);

var td_1 = document.createElement('TD');
tr_0.appendChild(td_1);
var text_5 = document.createTextNode("xx");
td_1.appendChild(text_5);

var td_2 = document.createElement('TD');
tr_0.appendChild(td_2);
var text_6 = document.createTextNode("xx");
td_2.appendChild(text_6);

var movietitle = document.createElement('INPUT');
movietitle.setAttribute("id", "movieTitle");
movietitle.setAttribute("placeholder", "Movie Title");
docFragment.appendChild(movietitle);

var a = document.createElement('A');
a.setAttribute("class", "button button-primary");
a.setAttribute("href", "#");
docFragment.appendChild(a);
var text_7 = document.createTextNode("Search");
a.appendChild(text_7);

  return docFragment;
}

function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
     }
    };

    xhr.send();
}