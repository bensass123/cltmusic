(function($){
  //array w days events
  var daysEvents = [
    
  ];

  

  // creates fake objects
  var createFakes = () => {
    var arr = [];
    for (i = 0; i < 4; i++) {
      arr.push({
        event: 'Event Title - Band Names' + i,
        desc: 'Description ' + i + 'description description description description description description description description description description description description description',
        img: 'http://lorempixel.com/300/200/nightlife/' + i,
        link: 'http://www.google.com'
      })
    }
    return arr;
  }

  // create test events
  var testEvents = createFakes();

  var createCarouselCard = (obj) => {
    //create card
    var $card = $('<div>', {class: 'contentDiv carousel-item card sticky-action horizontal blue-grey darken-4'});
    
    // create img and imgDiv
    var $imgDiv = $('<div>', {class: 'card-image'});
    var $img = $('<img>',{src: obj.img, class: 'activator'});
    $imgDiv.append($img);

    //create card-content div
    var $contentDiv = $('<div>', {class: 'card-content'});
    //title
    var $t = $('<span>', {class: 'card-title activator white-text', text: obj.event});
    var $i = $('<i>', {class:'material-icons right', text: 'more_vert'});
    $t.append($i);
    $contentDiv.append($t);
   
    // card action div for tix link
    var $actionDiv = $('<div>', {class: 'card-action'}).append('<p><a href="#">' + obj.href + '</a></p>');

    // reveal-div with description
    var $revealDiv = $('<div>', {class: 'card-reveal'});
    var $t2 = $('<span>', {class: 'card-title activator white-text', text: obj.event}).append('<i class="material-icons right">close</i>');
    var $p = $('<p>', {class: 'cardDesc', text: obj.desc});
  }


  //returns a div to be added to the carousel
  // var createCarouselObj = (obj) => {
  //   // var d = $('<div>');
  //   var contentDiv = $('<div>', {class: 'contentDiv carousel-item card horizontal light-blue darken-2'});

  //   // add event title
  //   var h = $('<h2>').text(obj.title);

  //   // add img
  //   var imgDiv = $('<div>', {class: 'card-image'});
  //   var img = $('<img>',{src: obj.img, class: 'activator'});
  //   imgDiv.append(img);

  //   // add desc
  //   var p = $('<p>', {
  //     class: 'descCarousel',
  //     text: obj.desc
  //   })

  //   // add link
  //   var a2 = $('<a>', {
  //     class: 'eventLink',
  //     href: 'http://google.com',
  //     text: obj.href
  //   });

  //   //append carousel
  //   contentDiv.append(h, imgDiv, p, a2);
  //   $('.carousel').append(contentDiv);
  // }

  var populateCarousel = (arr) => {
    for (var i =0; i<arr.length; i++) {
      createCarouselCard(arr[i]);
    }
  }



  $(function(){
    populateCarousel(testEvents);
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.carousel').carousel({full_width: true});

  }); // end of document ready
})(jQuery); // end of jQuery name space