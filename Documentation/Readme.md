The Immigrants
==============
Project Name: The Phoenix Project

Kareem Lewis: 100-870-990	Connor Mcgill: 100-850-946	Serge Klimkovitch: 100-829-840

Our web application really is a sort of imitation of Youtube. Our project involves allowing 
users to stream and search for music videos on our web app. The videos are be taken from Youtube
and embedded in our web page. The web client is responsible for searching for music videos on 
Youtube via an external API provided by Youtube as well as displaying the user interfaces. The 
server serves up webpages and their user interfaces to the client. The server is also responsible
for taking the data entered in our search form and storing it in our databases with the corresponding
Youtube link. It also serves up information from our back-end database which stores video links
along with corresponding values representing the number of hits on any given video. This information is
used to sort and display our top played videos to users. Our web app has 4 webpages, one main page,
one for users to search and stream videos, one for users to view and stream the top played videos and a
final page to stream continuously the top played videos.

Our main dependencies are Node.js, Express, MongoDB and the Jade Template Engine.

In order to run our program, all of the main dependencies must be installed. In order for our web application
to work properly, MongoDB must be started previous to running our application for the first time. And a quick note,
to stream videos on our top played webpage you simply have to click on the one you want to stream and it will pop
up in a modal window.

To view this web application in action visit the following link:
http://shrouded-depths-4037.herokuapp.com/home

