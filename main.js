var MOVIE_URL = 'http://www.omdbapi.com/?t=';
var FIREBASE_URL = 'https://mymovieproject.firebaseio.com/';
var FIREBASE_EMAIL_URL = 'https://nssc9authapp.firebaseio.com/';
var fb = new Firebase(FIREBASE_EMAIL_URL);
var moviePoster;

// START OF PASSWORD CODE

// fb.unauth();

$(".table-container").hide();
$(".movieSearch").hide();

$('.doResetPassword').click(function () {
  var email = $('input[type="email"]').val();

  fb.resetPassword({
    email: email
  }, function (err) {
    if (err) {
      alert(err.toString());
    } else {
      alert('Check your email!');
    }
  });
});

$('.doLogout').click(function () {
  fb.unauth();
})

$('.doRegister').click(function () {
  var email = $('input[type="email"]').val();
  var password = $('input[type="password"]').val();

  fb.createUser({
    email: email,
    password: password
  }, function (err, userData) {
    if (err) {
      alert(err.toString());
    } else {
      doLogin(email, password);
    }
  });

  event.preventDefault();
});

$('form').submit(function () {
  var email = $('input[type="email"]').val();
  var password = $('input[type="password"]').val();

  doLogin(email, password);
  event.preventDefault();
});

function clearLoginForm () {
  $('input[type="email"]').val('');
  $('input[type="password"]').val('');
}

function saveAuthData (authData) {
  $.ajax({
    method: 'PUT',
    url: `${FIREBASE_URL}/users/${authData.uid}/profile.json`,
    data: JSON.stringify(authData)
  });
}

$('.doLogin').click(function () {
  var email = $('input[type="email"]').val();
  var password = $('input[type="password"]').val();

  doLogin(email, password);
  event.preventDefault();
});

$('.doLogout').click(function () {
  fb.unauth(function () {
    window.location.reload();
  });
})

function doLogin (email, password, cb) {
  fb.authWithPassword({
    email: email,
    password: password
  }, function (err, authData) {
    if (err) {
      alert(err.toString());
    } else {
      saveAuthData(authData);
      typeof cb === 'function' && cb(authData);
    }
  });
}

fb.onAuth(function (authData) {
  var onLoggedOut = $('.onLoggedOut');
  var onLoggedIn = $('.onLoggedIn');
  var onMovieSearch = $('.movieSearch');
  var tableContainer = $('.table-container');
  var dataContainer = $('.data-container');
  var doLogOut = $('.doLogOut');

  if (authData && authData.password.isTemporaryPassword) {
    onMovieSearch.removeClass('hidden');
    onMovieSearch.removeAttr("style");
    onLoggedIn.addClass('hidden');
    onLoggedOut.addClass('hidden');
    $('.table-container').removeAttr('style')
    doLogOut.removeClass('hidden');
    doLogOut.show();
    tableContainer.removeClass('hidden');
    dataContainer.removeClass('hidden');
  } else if (authData) {
    $('.table-container').removeAttr('style')
    tableContainer.addClass('hidden');
    doLogOut.removeClass('hidden');
    onLoggedIn.removeClass('hidden');
    onLoggedOut.addClass('hidden');
    onMovieSearch.removeClass('hidden');
    onMovieSearch.removeAttr("style");
    // $('.onLoggedIn h1').append.text(${authData.password.email}`);
  }

  clearLoginForm();
});


//START OF MOVIE CODE

$.get(FIREBASE_URL + "movie.json", function (data) {
     Object.keys(data).forEach(function () {
      addMovieDetail(data);
   });
 });

  var movieTitle = document.querySelector('.search');

movieTitle.onclick = function () {

  var tableContainer = $('.table-container');
  tableContainer.removeClass('hidden');

  var input = document.querySelector('#movieTitle');
  var movie = input.value;

    $.get(MOVIE_URL + movie, function(data) {
      $.post(FIREBASE_URL + "movie.json", JSON.stringify(data), function(res) {
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
   $(".moviePoster").html("<img class='newMovie overlay'src='" + poster + "'</img>");

//When poster image is clicked, adds movie data to new table

moviePoster = $(".moviePoster");

  var $tableContainer = $(".table-container");
      $tableContainer[0].style.visibility='visible';
  var $dataContainer = $(".data-container");
      $tableContainer[0].style.visibility='visible';

  });
}

$(".moviePoster").on("click", function (data) {

  var dataContainer = $('.data-container');
  dataContainer.removeClass('hidden');


  var $table = $(".data-container");
  var tr = $table.append("<tr></tr>");
  title = $(".movieTitle").text();
  year = $(".movieYear").text();
  rated = $(".movieRated").text();
  rating = $(".movieRating").text();
  var poster = $(".newMovie").attr("src")

//Append new movies to table

    $(".data-container").find("tr:last")
            .append('<td class="addMovieDetailInfo">' + title + '</td>')
            .append('<td class="addMovieDetailInfo">' + year + '</td>')
            .append('<td class="addMovieDetailInfo">' + rated + '</td>')
            .append('<td class="addMovieDetailInfo">' + rating + '</td>')
            .append('<td class="appendedMoviePoster">' + "<img class='smallImage' src=" + poster + ">" + '</td>')
})

function addMovieDetail(data) {

  var detail = createMovieNode(data);
  var target = $('.movieContainer');

  target.empty();
  target.append(detail);
}

  //creates document fragment
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
