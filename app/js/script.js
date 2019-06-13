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

  const section = $('#categories option:selected').val();

  $.ajax({
      url: `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=cMfA0NO0S102DbxZsVap17SSVyu0hWxT`
    })
    .done(function (data) {

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


        const mobile = window.matchMedia('(max-width: 600px)');
        const tablet = window.matchMedia('(min-width: 601px) and (max-width: 1239px)')
        const desktop = window.matchMedia('(min-width: 1240px)');

        if (mobile.matches) {
          $('.main-header').css('height', '250px');
          $('.logo').css('height', '120px');
        }

        if (tablet.matches) { 

          $('.main-header').css('height', '165px');
          $('.logo').css({
            'height': '100px'
          });
          $('.select-wrapper').css({
            'text-align': 'left',
            'padding-left': '2rem'
          });
        }

        if (desktop.matches) {
          $('.main-header').css('height', '165px')
          $('.logo').css('height', '100px');
          $('footer').css({
            'text-align': 'left',
            'padding-left': '5rem'
          });
        }
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