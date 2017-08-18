var fs = require('fs'),
    path = require('path'),
    moment = require('moment');


var cheerio = require('cheerio');

var pathway =  path.join(__dirname, '/VisuliteScrape.html');



var shows = [];

var $ = cheerio.load(fs.readFileSync(pathway));

var getTicketFly = (fly) => {
    return fly.substring(7,14);
}

var isLive = (str) => {
    var r = str.toLowerCase().includes('mandyland') ||
            str.toLowerCase().includes('burlesque');
    return !r;
}

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('./JSON/VISULITE.json', json, 'utf8', ()=>{
        console.log('VISULITE.json created');
    })
}

$('div.showDetails').each(function(i, elem) { 

    var show = {
    event: '',
    date: '',
    times: '',
    id: '',
    href: '',
    hrefRef: '',
    desc: ''
    }

    // band/event
    console.log($(elem).children('h3').text().trim());
    show.event = console.log($(elem).children('h3').text().trim());

    // full -html - date
    console.log($(elem).children('p').html());

    // date extraction
    
    // var str = $(elem).children('p').html();
    // str = str.substring(0, str.indexOf(' at'));
    // console.log('--');
    // console.log(str)
    // show.date = moment(str).format('MM DD YY');
    // console.log(show.date);

    //href 
    var hrefString = 'https://www.visulite.com/' + $(elem).children('p.show-details').children('span.ui-button-text').children('a').attr('href');
    show.href = hrefString;
    console.log(hrefString)


    //hrefFref
    console.log($(elem).children('p.show-details').children('span.ui-button-text').children('a').attr('title'));
    
    // show.date = moment($(elem).children('td.date').children().text().trim()).format('MM DD');

    // // times
   // console.log($(elem).children('span.all-date').children('span.show-time').text().trim());
    //show.times = $(elem).children('span.all-date').children('span.show-time').text().trim();

    //desc
    //console.log($(elem).children('td.name').children('div.event-info').children('p').text().trim());
    // show.desc = $(elem).children('td.name').children('div.event-info').children('p').text().trim();

    // //ticketfly
    // console.log(getTicketFly($(elem).prev().attr('href')));
    // show.ticketfly = getTicketFly($(elem).prev().attr('href'));


    // console.log(i);
    console.log('\n\n\n');


    // test to see if live music before pushing to array
    // if (isLive(show.desc) && isLive(show.event)) {
         shows.push(show);
    // }
     
    
})

// functiont hat tests eevnt string against not words, return ture false

makeFile(shows);

