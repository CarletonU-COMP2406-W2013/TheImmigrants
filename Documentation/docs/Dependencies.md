Software Package Dependencies
=============================

- Node.js:
- liscensing: https://raw.github.com/joyent/node/v0.10.3/LICENSE
Framework model used to create our web server and respond to, and receive http requests

- MongoDB:
- licensing: http://www.mongodb.org/about/licensing/
Used as our backend database. Persistant data from our web server is stored using MongoDb. This data stored
included objects containing an artist's name, title of a song, a link to a YouTube video and a hit counter.
 
- Twitter Bootstrap:
- licensing: https://github.com/twitter/bootstrap/blob/master/LICENSE
The Twitter Boostrap libary was used extensively in order to create a more dynamic and responsive web app.
This library simplified the development of our client side interface, and contributed to the overall quality
of presentation

- JQuery:
- licensing: https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
The JQuery library was used in order to compliment the Twitter Bootstrap and make use of some of its cool features,
such as autocomplete. As well JQuery was used within our web application in order to simplify syntax of our 
clientside javascript, as well as to help simply our application's portability across different web browsers

- Express:
- licensing: https://github.com/visionmedia/express/blob/master/LICENSE
Express was used in our application as  middleware for our server in order to simply and organize low level 
functiomality of the node.js software. Express also aided in the organization and seperation of the application
buisness logic from our user interface 

- YouTube IFrame API:
- licensing: https://developers.google.com/youtube/terms
This API was used to enable and display embeded videos within our web application. This API greatly simplified
video playback within our application

- YouTube Data API:
- licensing: https://developers.google.com/youtube/terms
This API was used to search through YouTube's vast collection of music videos using their servers. This API
enabled us to link a user's search query to relevant music videos, from YouTube's database

- Jade Template Engine:
- licensing: https://github.com/visionmedia/jade/blob/master/Readme.md#a19 (Bottom of the page)
This Template engine was used to simplify the syntax of our client side interface code, as well as allow our many different web pages
to all share one common layout
