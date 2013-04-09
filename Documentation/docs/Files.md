Files in our repository
=======================
- app.js: Main file that creates our http server and starts the node event loop by listening on port 3000

- database/db.js: This file is used to connect to a database. All database functionality is encapsulated 
within this file

- public/javascripts/search.js: This file is used to search for specific videos. It also supports error checking. 

- public/javascripts/playerControl.js: This file uses YouTube's API to play videos and control the streaming of videos

- views/layout.jade: General layout of user interface with scripts linked in

- views/index.jade: Jade file with layout for our main home page
 
- views/topPlayed.jade: Jade file with layout for our top played videos webpage
 
- views/search.jade: Jade file with layout for our search page for users
 
- views/stream.jade: Jade file with layout for our streaming page

- routes/index.js: This file is used to encapsulate functions associated to specific get and post request routes

