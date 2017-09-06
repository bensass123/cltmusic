//current date, setup array of all events in db

var current = moment().format('MM DD YY');
var allEvents = [];

// function to return gmaps links
var getGmaps = (venue) => {
  switch (venue.toLowerCase()) {
    case 'the underground':
      return 'https://goo.gl/maps/3kcwmuGkWFQ2';
      break;
    case 'snug harbor':
      return 'https://goo.gl/maps/N3bvqVJcYxG2';
      break;
    case 'the fillmore':
      return 'https://goo.gl/maps/tiV35eB3X592';
      break;
    case 'neighborhood theatre':
      return 'https://goo.gl/maps/7Qd3wBTBTzn';
      break;
    case 'evening muse':
      return 'https://goo.gl/maps/x2rxv5W2eqw';
      break;
    case 'the milestone club':
      return 'https://goo.gl/maps/HhxuakVnJHQ2';
      break;
    case 'the tin roof':
      return 'https://goo.gl/maps/LqNxF92sBe22';
      break;
    case 'mcglohon theater':
      return 'https://goo.gl/maps/dt9xBtpCgyt';
      break;
    case 'belk theatre':
      return 'https://goo.gl/maps/3c8gUDnx9Ak';
      break;
    case 'visulite theatre':
      return 'https://goo.gl/maps/UApzhUTZago';
      break;  
    case "hattie's tap and tavern":
      return 'https://goo.gl/maps/3UGeMT4z6FR2';
      break;
  }
}


// READ IN JSON function

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
read('tinroof');
read('neighborhood');
read('visulite');
read('snug');
read('hatties');


// updates w events from selected day (default: today)
var getDaysEvents = (date) => {
  $('.date').text(moment(current).format('dddd, MMMM Do'));
  $('.carousel').remove();
  $('.carousel').carousel('destroy');
  // $('.carousel').removeClass('initialized');
  var $carouselDiv = $('<div>', {class: 'carousel'});
  $('.carousel-wrapper').append($carouselDiv);

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
      case 'Visulite Theatre':
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
          break;
      case 'Belk Theatre':
          logo = 'img/bars/belk.jpg';
          break;
      case "Hattie's Tap and Tavern":
          logo = 'img/bars/hatties.png';
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
  
  var $imgDiv = $('<div>', {class: 'card-image center activator white top-radius'});
  var $img = $('<img>',{src: logo, class: 'activator card-bar-logo top-radius'});


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
  var $t2 = $('<p>', {class: 'card-title reveal-title', text: obj.event});
  var $i2 = $('<i>', {class:"material-icons close-icon close-icon-top close card-title", text: 'close'});
  // $t2.append($i2);

  //gmaps link - directions
  var $gmaps = $('<a>', {class: 'deep-purple lighten-1 gmap-link green-text text-accent-2 flow-text card-desc bottom-radius', target: '_blank', text:'Google Maps -- ' + obj.venue, href: getGmaps(obj.venue)})

  // add image of band here 

  var $time = $('<p>', {class: 'event-time', text: obj.times});
  var $p = $('<p>', {class: 'card-desc', text: obj.desc});
  var $i3 = $('<i>', {class:"material-icons close-icon close-icon-bottom close card-title", text: 'close'});
  // <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
  if (obj.venue != "Hattie's Tap and Tavern") {
    var $tixBtn = $('<a>', {target: '_blank', class: 'btn-floating btn-large waves-effect waves-light red tix-btn', text: 'TIX', href: obj.tix});
    $revealDiv.append($i2, $t2, $time, $tixBtn, $p, $i3);
  } else {
    $revealDiv.append($i2, $t2, $time, $p, $i3);
  }
  
  
  

  

  // append all divs to card
  $card.append($imgDiv, $contentDiv, $revealDiv, $gmaps);

  

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
  $('.cards').velocity({
    opacity: 1
    }, 300, function() {
    // Animation complete.
  });
}

var nextDate = () => {
  console.log('next date');
  current = moment(current).add(1,'days').format('MM DD YY');
  //animation
  $('.cards').velocity({
        opacity: 0.25
    }, 300, function() {
    // Animation complete.
      $('.cards').empty();
      populateCarousel(getDaysEvents(current));
      $('.parallax').parallax();
  });
}

var prevDate = () => {
  console.log('prev date');
  current = moment(current).subtract(1,'days').format('MM DD YY');
  $('.cards').velocity({
        opacity: 0.25
  }, 300, function() {
    // Animation complete.
    $('.cards').empty();
    populateCarousel(getDaysEvents(current));
    $('.parallax').parallax();
    
  });
}

var setDate = () => {
  console.log('set date');
  var date = $('#selected-date').val();
  current = moment(date).format('MM DD YY');
  populateCarousel(getDaysEvents(current));
  $('.parallax').parallax();
}



$(function(){
  //next AND PREV date button
  $('.next').on('click', ()=>{
    nextDate();
  });

  $('.prev').on('click', ()=>{
    prevDate();
  });



  //concat all data arrays
  // allEvents = allEvents.concat(muse);
  // allEvents = allEvents.concat(snug);
  // allEvents = allEvents.concat(tinroof);
  // allEvents = allEvents.concat(milestone);

  
  
  $('.button-collapse').sideNav();
  $('.parallax').parallax();

  setTimeout(()=>{
    populateCarousel(getDaysEvents(current));
    
    // close button handler
    // $('.close-icon').on("click", (event)=>{
    //   console.log(event);
    //   // console.log('close');
    //   // $(this).parent('.card-title').click();
    // })
    
  }, 1200) 


  
  // $('.datepicker').pickadate({
  //   selectMonths: true, // Creates a dropdown to control month
  //   selectYears: 15, // Creates a dropdown of 15 years to control year,
  //   today: 'Today',
  //   clear: 'Clear',
  //   close: 'Ok',
  //   closeOnSelect: false // Close upon selecting a date,
  // });

  // $('button.picker__close').click(()=>{
  //   console.log('picked date');
  //   setDate();
  // })

  //did this in populateCarousel function instead
  //$('.carousel').carousel({full_width: true});

}); // end of document ready
