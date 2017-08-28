// READ IN JSON function

var current = moment().format('MM DD YY');
var allEvents = [];

var read = (venue) => {
  $.getJSON('./JSON/' + venue.toUpperCase() + '-FULL.json', function(data) {
    console.log(data);
    allEvents = allEvents.concat(data);
  });
}

read('muse');
read('milestone');
read('fillmore');
read('tinroof');
read('neighborhood');
read('visulite');
read('snug');

// updates w events from selected day (default: today)
var getDaysEvents = (date) => {
  $('#date').text(date);
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
var createFakes = () => {
  var arr = [];
  var venArr = ['file:///home/ben/Documents/CODE/cltmusic/img/bars/milestone.jpeg','file:///home/ben/Documents/CODE/cltmusic/img/bars/neighborhood.png','file:///home/ben/Documents/CODE/cltmusic/img/bars/rabbithole.png']
  for (i = 0; i < 4; i++) {
    arr.push({
      event: 'Event Title - Band Names' + i,
      desc: 'Description ' + i + 'description description description description description description description description description description description description description',
      img:  venArr[i%3],
      href: 'http://www.google.com'
    })
  }
  return arr;
}


// create test events
// var testEvents = createFakes();

var createCarouselCard = (obj) => {
  var logo;
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
          logo = 'img/bars/visulite.jpeg';
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
      
  }
  console.log('Logo', logo);

  //create container div
  var $container = $('<div>', {class: 'col s12 m3'});

  //create card 
  var $card = $('<div>', {class: 'hoverable card-div deep-purple card'});
  
  // create img and imgDiv
  var $imgDiv = $('<div>', {class: 'card-image center activator'});
  var $img = $('<img>',{src: logo, class: 'activator card-bar-logo'});
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
  var $p = $('<p>', {class: 'activator card-desc', text: obj.desc});
  $revealDiv.append($t2, $p);

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
    createCarouselCard(arr[i]);
  }
  // $('.carousel').carousel({full_width: true, noWrap: true});
}

var nextDate = () => {
  console.log('next date');
  current = moment(current).add(1,'days').format('MM DD YY');
  $('.cards').empty();
  populateCarousel(getDaysEvents(current));
  $('#current-date').text(moment(current).format('dddd, MMMM Do'));
}

var prevDate = () => {
  console.log('prev date');
  current = moment(current).subtract(1,'days').format('MM DD YY');
  $('.cards').empty();
  populateCarousel(getDaysEvents(current));
  $('#current-date').text(moment(current).format('dddd, MMMM Do'));
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

  populateCarousel(getDaysEvents(current));
  $('.button-collapse').sideNav();
  $('.parallax').parallax();

  //did this in populateCarousel function instead
  //$('.carousel').carousel({full_width: true});

}); // end of document ready
