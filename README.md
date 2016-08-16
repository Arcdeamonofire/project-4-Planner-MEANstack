# project-4-Planner-MEANstack
Mean stack app for daily planner by Samuel

# Languages used:
HTML, CSS, Javascript, angular.js, express, mongoose/mongoDB

# Synopsis
A Daily Planner with the ability to add Events (date, descriptions), and lists in order to help you plan your life.

# Trello
Daily Tracker: https://trello.com/b/E2btGm5i/final-projects

# MVP
- [x] Site/App with page views:
	- index
	- user home
	- user deck
  - events (add, show, delete)
  - lists (add, show, delete)
  - list items (add, show, delete)

- [x] User Login/logout

# User Stories
- User will see home screen when they load the app
- User will be able to create a unique username and password
- Users will be able to sign into app
- Users will be able to log out of their session
- Users will be able to make entries into their planner (events, Lists)

# Stretch Goals
- Google sign in and OAuth

# Wireframe

![wireframe - index](wireframes/wireframe_index.png)

# Technologies Used (API Reference?)
node.js, express, html, css, mongoDB, and mongoose, angular.js

# Approach
I began by with trying to create new users. This was difficult because I also began attempting to use Google's OAuth service to get users signed into my app. After over four days of not getting what I wanted out of Google's OAuth. I decided to just use my own sign up system and created that.

After I had that functionality I began working on getting the two functionalities working (events, lists). Once I had the events and lists populating correctly when I entered them I created delete routes to remove them.

I used Angular.js as a front end framework and Mongoose and MongoDB for my database.

# Live Site Link

https://dailyplannerapp.herokuapp.com/

#Installation Instructions
None at the moment

# Unsolved Problems
- Styling needs work!
