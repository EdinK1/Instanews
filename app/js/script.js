let output = $('.articles');
let select = $('#categories');


function loader() {
    $('.preload').show();
  }
  
  
  function showResults() {
    setTimeout(function() {
      $('.preload').hide();      
    }, 1000);
    }
  
function getData () { 


    loader();
    showResults();

    output.text('');

    const section = $('#categories option:selected').val();

$.ajax({
    method: 'GET',
    url: `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=cMfA0NO0S102DbxZsVap17SSVyu0hWxT`
  })
  .done(function (data) {
 
    for (let i = 0; i < data.results.length; i++) {

        let img = data.results[i].multimedia[4].url;
        let snippet = data.results[i].abstract;
        let url = data.results[i].url;


    let results =
    '<li class="article">' +
    '<a href="' + url + '" alt="url" target="_blank">' + '<img src="' + img + '">' + '</a>' +
    '<p class="description">' + snippet + '</p>' +
    '</li>';

    output.append(results);
    }
  });
}

select.on('change', getData);