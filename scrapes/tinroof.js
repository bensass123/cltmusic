var fs = require('fs'),
    path = require('path'),
    moment = require('moment');


var cheerio = require('cheerio');

var pathway =  path.join(__dirname, '/TinRoofScrape.html');



var shows = [];

var $ = cheerio.load(fs.readFileSync(pathway));

var getTicketFly = (fly) => {
    return fly.substring(7,14);
}

var isLive = (str) => {
    var r = str.toLowerCase().includes('karaoke') ||
            str.toLowerCase().includes('watch party') ||
            str.toLowerCase().includes('trivia') ||
            str.toLowerCase().includes('guest list') ||
            str.toLowerCase().includes('private');
    return !r;
}

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('./JSON/TINROOF.json', json, 'utf8', ()=>{
        console.log('TINROOF.json created');
    })
}

$('tr').each(function(i, elem) { 

    var show = {
    event: '',
    date: '',
    times: '',
    ticketfly: '',
    href: '',
    desc: ''
    }

    // band/event
    console.log($(elem).children('td.name').children('h3').text().trim());
    show.event = $(elem).children('td.name').children('h3').text().trim();

    // date
    console.log(moment($(elem).children('td.date').children().text().trim()).format('MM DD 17'));
    show.date = moment($(elem).children('td.date').children().text().trim()).format('MM DD 17');

    // // times
   // console.log($(elem).children('span.all-date').children('span.show-time').text().trim());
    //show.times = $(elem).children('span.all-date').children('span.show-time').text().trim();

    //desc
    console.log($(elem).children('td.name').children('div.event-info').children('p').text().trim());
    show.desc = $(elem).children('td.name').children('div.event-info').children('p').text().trim();

    // //href
    // console.log($(elem).prev().attr('href'));
    // show.href = 'http://www.eveningmuse.com/' + $(elem).prev().attr('href');

    // //ticketfly
    // console.log(getTicketFly($(elem).prev().attr('href')));
    // show.ticketfly = getTicketFly($(elem).prev().attr('href'));


    // console.log(i);
    console.log('\n\n\n');


    // test to see if live music before pushing to array
    if (isLive(show.desc) && isLive(show.event)) {
        shows.push(show);
    }
     
    
})

// functiont hat tests eevnt string against not words, return ture false

makeFile(shows);

