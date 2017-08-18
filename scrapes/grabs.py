from selenium import webdriver
import io


import json
from collections import namedtuple












def download(venue, url):

    browser = webdriver.Chrome() #replace with .Firefox() etc

    browser.get(url) #navigate to the page

    innerHTML = browser.execute_script("return document.body.innerHTML") #returns the inner HTML as a string

    page = open("./HTML/" + venue + "Scrape.html","a",encoding='utf8') #creates file with name of "...Scrape.html"



    page.write(innerHTML)

    page.close()
    browser.close()

download('Snug','http://snugrock.com')
download('Visulite','http://www.visulite.com/upcomingShows.cfm')
download('NeighborhoodTheatre','http://www.neighborhoodtheatre.com/')
download('Fillmore','http://www.fillmorecharlottenc.com/')
download('EveningMuse','http://www.eveningmuse.com/')
download('TinRoof','http://www.tinroofcharlotte.com/calendar')
download('Milestone','https://themilestone.club/calendar/')
download('CoyoteJoes','http://www.coyote-joes.com/events.html')

# for i in data:
#     # download('visuliteSOLO',visuliteHref)
#     # print(d)
#     # Parse JSON into an object with attributes corresponding to dict keys.
#     x = json.loads(str(i), object_hook=lambda d: namedtuple('X', d.keys())(*d.values()))
#     print(x.href)