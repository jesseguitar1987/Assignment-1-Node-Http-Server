# Assignment 1 - Node http server

# Functionality

A basic node http server that returns system information based on the route. 
'/' greets the user and displays the current time
'/?name=Yourname' uses the query string for a personalized greeting
'/about' shows the host name and system uptime
'time' shows th current date and time

If the user goes to any other route, then a 404 - Page not found error appears.

# How to run this on your local computer
```bash
npm install
npm start

Then go to: http://localhost:3000
