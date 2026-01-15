// the address of this server connected t o the network is http://localhost:2003
// URL -> http://localhost:2003
// IP -> 127.0.0.1:2003
// it takes a minimum of 4 lines of codes to creat a basic server in nodejs
const express = require('express'); // 1. import express
const app = express(); // 2. create an express app

const PORT = 2003;


// ENDPOINT - HTTP VERBS (method) & Routes or Paths
// The method informs the nature of request and the route is a furhter subdirectory (basically we direct the request to the body of code to respond appropriately, adn these locations or routes are called endpoints)



// Type 01 - Website endpoints : these endpoints are for sending back html and they typically come whena user enters a url in a browser
app.get('/' , (req, res)=>{
    res.send('<h1>homepage</h1><input>')
})
app.get('/dashboard', (req,res)=>{
    //this is endpoint number 2 - /dashboard
    res.send('<h1>dashboard</h1>');
})


// Type 2 - API endpoints

app.get('/api/data', (req,res)=>{
    console.log('This one is for data');
    res.send(data);
})

// we create many endpoints based on the needs of the application

app.listen(PORT, ()=> {
    console.log(`Server is running on : ${PORT}`);
}) //listen takes PORT which is an adres within the IP adress and the other things that the app.listen takes is a callback function which is the function that will be run when the server is up and running