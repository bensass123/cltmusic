var fs = require('fs'),
    path = require('path'),
    moment = require('moment');


var cheerio = require('cheerio');

var pathway =  path.join(__dirname, '/MilestoneScrape.html');



var shows = [];

var $ = cheerio.load(fs.readFileSync(pathway));

var getTuneStub = (fly) => {
    return fly.substring(43,49);
}

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('./JSON/MILESTONE.json', json, 'utf8', ()=>{
        console.log('MILESTONE.json created');
    })
}

$('article.eventlist-event').each(function(i, elem) { 

    var show = {
        venue: 'The Milestone Club',
        event: '',
        date: '',
        times: '',
        tuneStub: '',
        href: '',
        desc: '',
        ticketfly: ''
    }

    //console.log($(elem))

    // band/event
    console.log($(elem).children('div.eventlist-column-info').children('h1.eventlist-title').text());
    show.event = $(elem).children('div.eventlist-column-info').children('h1.eventlist-title').text();

    // date
    console.log(moment($(elem).children('a.eventlist-column-date').children('div.eventlist-datetag').children('div.eventlist-datetag-inner').children('div.eventlist-datetag-startdate').text()).format('MM DD YY'));
    show.date = moment($(elem).children('a.eventlist-column-date').children('div.eventlist-datetag').children('div.eventlist-datetag-inner').children('div.eventlist-datetag-startdate').text()).format('MM DD YY');

    //desc 
    console.log($(elem).children('div.eventlist-column-info').children('div.eventlist-excerpt').text());
    show.desc = $(elem).children('div.eventlist-column-info').children('div.eventlist-excerpt').html();

    // times
    console.log($(elem).children('div.eventlist-column-info').children('ul.eventlist-meta').children('li.eventlist-meta-time').text());
    show.times = $(elem).children('span.all-date').children('span.show-time').text().trim();

    // //href
   // console.log($(elem).prev().children('a').attr('href'));
    //show.href = 'http://www.tunestub.com/events/' + getTuneStub($(elem).prev().children('a').attr('href'));

    //TuneStub
    //console.log(getTuneStub($(elem).prev().children('a').attr('href')));
    //show.tuneStub = getTuneStub($(elem).prev().children('a').attr('href'));


    // console.log(i)

    console.log('\n')

    shows.push(show);
    
})

// uncomment this

//console.log(shows);
makeFile(shows);



// setTimeout(()=>{}, 3000000);


// // h2 topline-info 

// // h1 headliners



// var selectors = {
//     titles: 'a[class=show-title-a]',
//     date: 'span[class=all-date]',
//     desc: 'p[class=show-desc]' 
// }




