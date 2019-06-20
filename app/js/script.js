$(document).ready(() => {

let output = $('.articles');
let select = $('#categories');

function loader() {
  $('.preload').show();
}

function showResults() {
  setTimeout(function () {
    $('.preload').hide();
  }, 1000);
}

function getData() {

  loader();
  showResults();

  output.text('');

  const section = $('select').val();

  $.ajax({
      url: `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=cMfA0NO0S102DbxZsVap17SSVyu0hWxT`
    })
    .done(function (data) {

    $('.main-header, .logo').addClass('loaded');

      let counter = 0;
      
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].multimedia.length >= 5 && counter < 12) {
            counter += 1;

        let img = data.results[i].multimedia[4].url;
        let snippet = data.results[i].abstract;
        let url = data.results[i].url;

        let results =

          `<li class='article'>
          <a href=${url} alt='url' target='_blank'><img src=${img}></a>
          <p class='description'>${snippet}</p>
          </li>`;

        output.append(results);
      }
    }
    })
    .fail(() => {
      output.append(`<p>Sorry, something went wrong</p>`);
    });
  }
  select.on('change', getData);
});