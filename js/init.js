// READ IN JSON function

var current = moment().format('MM DD YY');
var allEvents = [];

var read = (venue) => {
  $.getJSON('./JSON/' + venue.toUpperCase() + '-FULL.json', function(data) {
    console.log(data);
    allEvents = allEvents.concat(data);
  });
}


// reading in all data
read('muse');
read('milestone');
read('fillmore');
//read('tinroof');
read('neighborhood');
read('visulite');
read('snug');

// updates w events from selected day (default: today)
var getDaysEvents = (date) => {
  $('#date').text(moment(current).format('dddd, MMMM Do'));
  $('.carousel').remove();
  $('.carousel').carousel('destroy');
  // $('.carousel').removeClass('initialized');
  var $carouselDiv = $('<div>', {class: 'carousel'});
  $('.carousel-wrapper').append($carouselDiv);
  //$('#date').text(current);
  console.log(date);
  var daysEvents = [];
  for (i in allEvents) {
      if (allEvents[i].date === date) {
          console.log(allEvents[i]);
          daysEvents.push(allEvents[i]);
      }
  }
  return daysEvents;
}


// creates fake objects
// var createFakes = () => {
//   var arr = [];
//   var venArr = ['file:///home/ben/Documents/CODE/cltmusic/img/bars/milestone.jpeg','file:///home/ben/Documents/CODE/cltmusic/img/bars/neighborhood.png','file:///home/ben/Documents/CODE/cltmusic/img/bars/rabbithole.png']
//   for (i = 0; i < 4; i++) {
//     arr.push({
//       event: 'Event Title - Band Names' + i,
//       desc: 'Description ' + i + 'description description description description description description description description description description description description description',
//       img:  venArr[i%3],
//       href: 'http://www.google.com'
//     })
//   }
//   return arr;
// }


// create test events
// var testEvents = createFakes();

var createCarouselCard = (obj, numcards) => {
  var logo;
  var venue;
  switch(obj.venue) {
      case 'Snug Harbor':
          logo = 'img/bars/snug.png';
          break;
      case 'The Tin Roof':
          logo = 'img/bars/tinroof.png';
          break;
      case 'Evening Muse':
          logo = 'img/bars/muse.png';
          break;
      case 'The Milestone Club':
          logo = 'img/bars/milestone.jpeg';
          break;
      case 'The Fillmore':
          logo = 'img/bars/fillmore.png';
          break;
      case 'The Visulite':
          logo = 'img/bars/visuliteClear.png';
          break;
      case 'The Tinroof':
          logo = 'img/bars/tinroof.png';
          break;
      case 'Neighborhood Theatre':
          logo = 'img/bars/neighborhood.png';
          break;
      case 'The Underground':
          logo = 'img/bars/underground.jpg';
          break;
      case 'McGlohon Theater':
          logo = 'img/bars/mcglohon.jpg';
          break
      case 'Belk Theatre':
          logo = 'img/bars/belk.jpg';
          break
      
  }
  console.log('Logo', logo);


  //create container div
  //if numcards 5,6 -> m2
  // if numcards > 6, m1
  console.log(numcards, ' <---- numcards');
  //default column size for cards
  var msize = 'm2';
  switch (numcards) {
    case 1:
      msize = 'm4 offset-m4';
      break;
    case 2: 
      msize = 'm4 offset-m1';
      break;
    case 3: 
      msize = 'm4';
      break;
    case 4:
      msize = 'm3';
      break;
    case 5:
      msize = 'm2';
      break;
    case 6:
      msize = 'm2';
      break;
  }


  var $container = $('<div>', {class: 'col s12 ' + msize});

  //create card 
  var $card = $('<div>', {class: 'hoverable card-div  card radius indigo lighten-2'});
  
  // create img and imgDiv
  
  // if (false) {
  //   var $imgDiv = $('<div>', {class: 'card-image center activator white'});
  //   var $img = $('<img>',{src: logo, class: 'activator card-bar-logo negative', style: 'mix-blend-mode: multiply;'});
  // } else {
    var $imgDiv = $('<div>', {class: 'card-image center activator white top-radius'});
    var $img = $('<img>',{src: logo, class: 'activator card-bar-logo top-radius'});
  // }

  if (obj.venue==='Snug Harbor' || obj.venue === 'The Tin Roof') {
    $imgDiv.removeClass('white');
    $imgDiv.addClass('black');
  }
  
  $imgDiv.append($img);

  //create card-content div
  var $contentDiv = $('<div>', {class: 'card-content activator'});
  //title
  var $t = $('<span>', {class: 'card-title activator event-title', text: obj.event});
  var $i = $('<i>', {class:'material-icons right', text: 'expand_more'});
  $t.append($i);

  //truncated desc
  var $trunc = $('<p>', {class: 'card-desc truncate  activator', text: obj.desc});
  
  $contentDiv.append($t, $trunc);
  


  // reveal-div with description
  var $revealDiv = $('<div>', {class: 'card-reveal activator deep-purple lighten-1'});
  var $t2 = $('<p>', {class: 'card-title reveal-title activator', text: obj.event});
  var $i2 = $('<i>', {class:"material-icons right activator close-icon", text: 'close'});
  $t2.append($i2);
  var $time = $('<p>', {class: 'activator event-time', text: obj.times});
  var $p = $('<p>', {class: 'activator card-desc', text: obj.desc});
  // <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
  var $tixBtn = $('<a>', {target: '_blank', class: 'btn-floating btn-large waves-effect waves-light red tix-btn', text: 'TIX', href: obj.href});
  
  $revealDiv.append($t2, $time, $tixBtn, $p);

  // append all divs to card
  $card.append($imgDiv, $contentDiv, $revealDiv);

  //append card to container
  $container.append($card);

  // append card to carousel
  $('.cards').append($container);
}

// creating/recreating carousel
var populateCarousel = (arr) => {
  for (var i =0; i<arr.length; i++) {
    createCarouselCard(arr[i], arr.length);
  }
  // $('.carousel').carousel({full_width: true, noWrap: true});
}

var nextDate = () => {
  console.log('next date');
  current = moment(current).add(1,'days').format('MM DD YY');
  $('.cards').empty();
  populateCarousel(getDaysEvents(current));
  $('.parallax').parallax();
}

var prevDate = () => {
  console.log('prev date');
  current = moment(current).subtract(1,'days').format('MM DD YY');
  $('.cards').empty();
  populateCarousel(getDaysEvents(current));
  $('.parallax').parallax();
}

var setDate = () => {
  console.log('set date');
  var date = $('#selected-date').val();
  current = moment(date).format('MM DD YY');
  $('.cards').empty();
  populateCarousel(getDaysEvents(current));
  $('.parallax').parallax();
}



$(function(){
  //next AND PREV date button
  $('#next').click(()=>{
    nextDate();
  });

  $('#prev').click(()=>{
    prevDate();
  });



  //concat all data arrays
  // allEvents = allEvents.concat(muse);
  // allEvents = allEvents.concat(snug);
  // allEvents = allEvents.concat(tinroof);
  // allEvents = allEvents.concat(milestone);

  
  $('.button-collapse').sideNav();
  $('.parallax').parallax();

  populateCarousel(getDaysEvents(current));
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

  $('button.picker__close').click(()=>{
    console.log('picked date');
    setDate();
  })
  //did this in populateCarousel function instead
  //$('.carousel').carousel({full_width: true});

}); // end of document ready
