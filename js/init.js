
  
  var current = moment().format('MM DD YY');
  var allEvents = [];




  // updates w events from selected day (default: today)
  var getDaysEvents = (date) => {
    $('.carousel').empty();
    $('.carousel').removeClass('initialized');
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
    }
    console.log('Logo', logo);

    //create card 
    var $card = $('<div>', {class: 'cardDiv carousel-item card sticky-action blue-grey darken-4'});
    
    // create img and imgDiv
    var $imgDiv = $('<div>', {class: 'card-image'});
    var $img = $('<img>',{src: logo, class: 'activator card-bar-logo'});
    $imgDiv.append($img);

    //create card-content div
    var $contentDiv = $('<div>', {class: 'card-content'});
    //title
    var $t = $('<span>', {class: 'card-title activator white-text blue-grey darken-4', text: obj.event});
    var $i = $('<i>', {class:'material-icons right', text: 'expand_more'});
    $t.append($i);

    //truncated desc
    var $trunc = $('<p>', {class: 'card-desc truncate', text: obj.desc});
    
    $contentDiv.append($t, $trunc);
   
    // card action div for tix link
    var $actionDiv = $('<div>', {class: 'card-action activator blue-grey darken-4'}).append('<p><a href="' + obj.href + '">' + 'Event Link' + '</a></p>');

    // reveal-div with description
    var $revealDiv = $('<div>', {class: 'card-reveal blue-grey darken-3'});
    var $t2 = $('<span>', {class: 'card-title activator white-text', text: obj.event}).append('<i class="material-icons right">close</i>');
    var $p = $('<p>', {class: 'card-desc', text: obj.desc});
    $revealDiv.append($t2, $p);

    // append all divs to card
    $card.append($imgDiv, $contentDiv, $actionDiv, $revealDiv);

    // append card to carousel
    $('.carousel').append($card);
  }

  var populateCarousel = (arr) => {
    for (var i =0; i<arr.length; i++) {
      createCarouselCard(arr[i]);
    }
    $('.carousel').carousel({full_width: true});
  }

  var nextDate = () => {
    current = moment(current).add(1,'days').format('MM DD YY');
    populateCarousel(getDaysEvents(current));
  }

  var prevDate = () => {
      current = moment(current).subtract(1,'days').format('MM DD YY');
      populateCarousel(getDaysEvents(current));
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
    allEvents = allEvents.concat(muse);
    allEvents = allEvents.concat(snug);
    allEvents = allEvents.concat(tinroof);
    allEvents = allEvents.concat(milestone);

    populateCarousel(getDaysEvents(current));
    $('.button-collapse').sideNav();
    $('.parallax').parallax();

    //did this in populateCarousel function instead
    //$('.carousel').carousel({full_width: true});

  }); // end of document ready
