# Not-Craigslist

## Intro
    Our web application is designed for used merchandise trading business.
    It is a C2C information platform for user to upload all kinds of stuff.
    All the User could utilize this platform to share information, contact each other, and finish the trade. 

## Technology
#### Server side:
    Node.js: Server-side JavaScript environment
    Express: Web development framework for Node.js
    MongoDB: document-oriented database
    Mongoose: MongoDB object modeling tool to define database Schema
    Redis: Cache information to improve preformance
    Webpack: module bundler
    Passport: Authentication tool

#### Client side:
    React: Writing component based user interface
    Redux: Predictable state container for react
    SASS: writing stylesheets
    Gulp: Compress sass file and compile it to CSS
    Disqus: Third-party tool for comment

## Step to run the project:

#### For Redis:
    Please open your redis-server in any way
#### Run in 'workers' folders:
    npm install
    npm start
*(Caution : We found out if the global mongoldb version doesn’t match the workers dependences, there might be problem show up in running the worker, if the error show up, please ‘npm install mongodb’ additionally.)*
#### Run in 'react-redux-1' folder:
    npm install
    gulp styles
    gulp css
    gulp
    
    npm start 
#### visit: localhost:3000
    
