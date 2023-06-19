const express = require("express");
const https = require("https");
const axios = require("axios");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.get("/", function(req,res){
    // res.send("server is up and running."); 
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apikey = "ab784b137df39c66a88144470537926b";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apikey +"&units=metric";
    https.get(url, function(response) {
        let data = '';

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const ImageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p> The current weather in " + query +" is " + weatherDes + "<p>");
            res.write("<h1>the current tempreture in " + query +" is "+ temp + " degree celsius.</h1>" );
            res.write("<img src="+ImageURL+">");
            res.send();
        });


    }).on('error', function(error) {
        console.error(error);
    });
})

app.listen(3000, function(){
    console.log("server is up and running at port 3000");
})