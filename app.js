const express = require("express");

const https = require("https");

const bodyParses = require("body-parser");
const bodyParser = require("body-parser");
const { url } = require("inspector");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req,res){
    console.log(req.body.cityName);

const query ="lebanon"
const apiKey ="05b1ec8d528cfded2a5e71f763c7613a"
const unit ="metric"
const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;


    https.get(url, function(response){
        console.log(response.statusCode)
    
    response.on("data", function(data){
        const weatherData =JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription =weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
       
        //Theres an issue right here with the image 
        const imageURL ="http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("The weather is currently" + weatherDescription)
        res.write("The temprature in" + query+ "is currently" + temp )
        //Also leaking down into the image source 
        res.write("<img src=" + imageURL +">");
        res.send();
    });
});

});
   



app.listen(3000, function(){
console.log("Welcome to the port 3000:");
});