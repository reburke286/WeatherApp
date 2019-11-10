$(document).ready(function(){

var latPush = [""];
var lonPush = [""];

function clearOldSearch() {
  var cityDiv = $(".city-div");
  var dayOneDiv = $("#day-one")
  var dayTwoDiv = $("#day-two")
  var dayThreeDiv = $("#day-three")
  var dayFourDiv = $("#day-four")
  var dayFiveDiv = $("#day-five")

  if (cityDiv !== "") {
    cityDiv.html("");
  }

  if (dayOneDiv !== "") {
    dayOneDiv.html("");
  }

  if (dayTwoDiv !== "") {
    dayTwoDiv.html("")
  }

  if (dayThreeDiv !== "") {
    dayThreeDiv.html("")
  }

  if (dayFourDiv !== "") {
    dayFourDiv.html("")
  }

  if (dayFiveDiv !== "") {
    dayFiveDiv.html("")
  } 
};


function displayWeatherInfo() {

    var city = $("#city-input").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=9859fc6998842f2d4d3f91cde44162d0";
    // Creating an AJAX call for the specific city being searched
    $.ajax({
      url: queryURL,
      // url: forecastURL,
      method: "GET"
    }).then(function(response) {
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      latPush.push(lat);
      lonPush.push(lon);

      // Creating a div to hold the city
      var cityDiv = $(".city-div");

      // Storing the city data
      var cityName = response.name;

      // Creating an element to have the city displayed
      var h3Tag = $("<h3>").text(cityName);

      // Displaying city
      cityDiv.append(h3Tag);

      // Storing the temperature
      var temperature = response.main.temp;
      var tempFarenheit = (temperature - 273.15) * 1.8 + 32;
      var tempFixed = tempFarenheit.toFixed(1);
      var icon = response.weather[0].icon;
      var iconImage = "http://api.openweathermap.org/img/w/" + icon + ".png";
      var iconImageApp = $("<img>").attr("src", iconImage);
      

      //   Creating an element to hold the temperature
      var pTemp = $("<p>").text("Temperature: " + tempFixed + "°");
      pTemp.append(iconImageApp);

      // Displaying the temperature
      cityDiv.append(pTemp);

      // Storing the humidity
      var humidity = response.main.humidity;

      // Creating an element to hold the humidity
      var pHumid = $("<p>").text("Humidity: " + humidity + "%");

      // Appending the humidity
      cityDiv.append(pHumid);
      
      // Storing the wind speed
      var windSpeed = response.wind.speed;

      // Creating an element to hold the wind speed
      var pWind = $("<p>").text("Wind Speed: " + windSpeed);

      // Appending the wind speed
      cityDiv.append(pWind);
      findUVIndex();
    });
   

  };

  function findUVIndex() {

    var indexURL = "http://api.openweathermap.org/data/2.5/uvi?APPID=9859fc6998842f2d4d3f91cde44162d0&lat=" + latPush[1] + "&lon=" + lonPush[1];

    $.ajax({
      url: indexURL,
      method: "GET"
    }).then(function(response) {
      var UVIndex = response.value;

      // Creating an element to hold the humidity
      var pIndex = $("<p>").text("UV Index: " + UVIndex);
  
      // Appending the humidity
      var cityDiv = $(".city-div");
      cityDiv.append(pIndex);  

    }); 
  
   };

  function displayForecast() {

    var city = $("#city-input").val();
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=9859fc6998842f2d4d3f91cde44162d0";

    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function(response) {
   
    // Creating a div to hold Day One
    var dayOneDiv = $("#day-one");

    // Storing Day One Date
    var dayOneDate = moment().format("M/D/YYYY");
    // Storing Day One Icon
    var dayOneIcon = response.list[0].weather[0].icon;
    var dayOneIconImage = "http://api.openweathermap.org/img/w/" + dayOneIcon + ".png";
    var dayOneIconImageApp = $("<img>").attr("src", dayOneIconImage);
    // Storing Day One Temp
    var tempDayOne = response.list[0].main.temp;
    var tempFarenheitDayOne = (tempDayOne - 273.15) * 1.8 + 32;
    var tempFixedDayOne = tempFarenheitDayOne.toFixed(1);
    // Storing Day One Humidity 
    var humidDayOne = response.list[0].main.humidity;

    // Creating an element to have Day One Info displayed
    var pDayOneDate = $("<p>").text(dayOneDate);
    var pTempDayOne = $("<p>").text("Temp: " + tempFixedDayOne + "°F")
    var pHumid = $("<p>").text("Humidity: " + humidDayOne + "%")
    // Appending Day One Forecast
    dayOneDiv.append(pDayOneDate);
    dayOneDiv.append(dayOneIconImageApp);
    dayOneDiv.append(pTempDayOne);
    dayOneDiv.append(pHumid);

    // Creating a div to hold Day Two
    var dayTwoDiv = $("#day-two");
    // Storing Day Two
    var dayTwoDate = moment().add(1, "days").format("M/D/YYYY");
    // Storing Day Two Icon
    var dayTwoIcon = response.list[1].weather[0].icon;
    var dayTwoIconImage = "http://api.openweathermap.org/img/w/" + dayTwoIcon + ".png";
    var dayTwoIconImageApp = $("<img>").attr("src", dayTwoIconImage);
    // Storing Day Two Temp
    var tempDayTwo = response.list[1].main.temp;
    var tempFarenheitDayTwo = (tempDayTwo - 273.15) * 1.8 + 32;
    var tempFixedDayTwo = tempFarenheitDayTwo.toFixed(1);
    // Storing Day Two Humidity
    var humidDayTwo = response.list[1].main.humidity;
    // Creating an element to have Day One Info displayed
    var pDayTwoDate = $("<p>").text(dayTwoDate);
    var pTempDayTwo = $("<p>").text("Temp: " + tempFixedDayTwo + "°F")
    var pHumidTwo = $("<p>").text("Humidity: " + humidDayTwo + "%")
    // Appending Day Two Forecast
    dayTwoDiv.append(pDayTwoDate);
    dayTwoDiv.append(dayTwoIconImageApp);
    dayTwoDiv.append(pTempDayTwo);
    dayTwoDiv.append(pHumidTwo);

    // Creating a div to hold Day Three
    var dayThreeDiv = $("#day-three");
    // Storing Day Three
    var dayThreeDate = moment().add(2, "days").format("M/D/YYYY");
    // Storing Day Three Icon
    var dayThreeIcon = response.list[2].weather[0].icon;
    var dayThreeIconImage = "http://api.openweathermap.org/img/w/" + dayThreeIcon + ".png";
    var dayThreeIconImageApp = $("<img>").attr("src", dayThreeIconImage);
    // Storing Day Three Temp
    var tempDayThree = response.list[2].main.temp;
    var tempFarenheitDayThree = (tempDayThree - 273.15) * 1.8 + 32;
    var tempFixedDayThree = tempFarenheitDayThree.toFixed(1);
    // Storing Day Three Humidity
    var humidDayThree = response.list[2].main.humidity;
    // Creating an element to have Day Three Info displayed
    var pDayThreeDate = $("<p>").text(dayThreeDate);
    var pTempDayThree = $("<p>").text("Temp: " + tempFixedDayThree + "°F")
    var pHumidThree = $("<p>").text("Humidity: " + humidDayThree + "%")
    // Appending Day One Forecast
    dayThreeDiv.append(pDayThreeDate);
    dayThreeDiv.append(dayThreeIconImageApp);
    dayThreeDiv.append(pTempDayThree);
    dayThreeDiv.append(pHumidThree);

    // Creating a div to hold Day Two
    var dayFourDiv = $("#day-four");
    // Storing Day Two
    var dayFourDate = moment().add(3, "days").format("M/D/YYYY");
    // Storing Day Two Icon
    var dayFourIcon = response.list[3].weather[0].icon;
    var dayFourIconImage = "http://api.openweathermap.org/img/w/" + dayFourIcon + ".png";
    var dayFourIconImageApp = $("<img>").attr("src", dayFourIconImage);
    // Storing Day Two Temp
    var tempDayFour = response.list[3].main.temp;
    var tempFarenheitDayFour = (tempDayFour - 273.15) * 1.8 + 32;
    var tempFixedDayFour = tempFarenheitDayFour.toFixed(1);
    // Storing Day Two Humidity
    var humidDayFour = response.list[3].main.humidity;
    // Creating an element to have Day One Info displayed
    var pDayFourDate = $("<p>").text(dayFourDate);
    var pTempDayFour = $("<p>").text("Temp: " + tempFixedDayFour + "°F")
    var pHumidFour = $("<p>").text("Humidity: " + humidDayFour + "%")
    // Appending Day One Forecast
    dayFourDiv.append(pDayFourDate);
    dayFourDiv.append(dayFourIconImageApp);
    dayFourDiv.append(pTempDayFour);
    dayFourDiv.append(pHumidFour);

  // Creating a div to hold Day Two
  var dayFiveDiv = $("#day-five");
  // Storing Day Two
  var dayFiveDate = moment().add(4, "days").format("M/D/YYYY");
  // Storing Day Two Icon
  var dayFiveIcon = response.list[4].weather[0].icon;
  var dayFiveIconImage = "http://api.openweathermap.org/img/w/" + dayFiveIcon + ".png";
  var dayFiveIconImageApp = $("<img>").attr("src", dayFiveIconImage);
  // Storing Day Two Temp
  var tempDayFive = response.list[4].main.temp;
  var tempFarenheitDayFive = (tempDayFive - 273.15) * 1.8 + 32;
  var tempFixedDayFive = tempFarenheitDayFive.toFixed(1);
  // Storing Day Two Humidity
  var humidDayFive = response.list[4].main.humidity;
  // Creating an element to have Day One Info displayed
  var pDayFiveDate = $("<p>").text(dayFiveDate);
  var pTempDayFive = $("<p>").text("Temp: " + tempFixedDayFive + "°F")
  var pHumidFive = $("<p>").text("Humidity: " + humidDayFive + "%")
  // Appending Day One Forecast
  dayFiveDiv.append(pDayFiveDate);
  dayFiveDiv.append(dayFiveIconImageApp);
  dayFiveDiv.append(pTempDayFive);
  dayFiveDiv.append(pHumidFive);
})  
};   

function displayingRecentSearches() {
    var recentSearches = getCitiesFromLocalStorage();
    var threeCities = recentSearches.slice(0, 3)
    localStorage.getItem("recentSearches");
    var recentSearchesDiv = $("#search");
    var li = $("<li>");
    recentSearchesDiv.append(li);

    for (var i = 0; i < threeCities.length; i++) {
      if (threeCities.length === 1 | threeCities.length === 2 | threeCities.length === 3) {
        var exampleCity = $("<a class=\"nav-link active\">")
        exampleCity.text(recentSearches[i]);
        exampleCity.attr("href", "#");
        li.append(exampleCity);
      }
       
    };
    // var link = 
};

function addRecentSearches() {
    var city = $("#city-input").val().trim();
    var recentSearches = getCitiesFromLocalStorage();
    recentSearches.unshift(city);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    console.log(recentSearches);

    };

  function getCitiesFromLocalStorage() {
    var recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
    if (!recentSearches) {
        recentSearches = [];
    }
    return recentSearches;
  };
  displayingRecentSearches();

$(document).on("click", "#button-addon2", function() {
  event.preventDefault();
 
  displayWeatherInfo();
  displayForecast();
  addRecentSearches();
  clearOldSearch();
});

var input = document.getElementById("city-input");
input.addEventListener("keyup", function(event) {
  
  if (event.keyCode === 13) {
    event.preventDefault();
    displayWeatherInfo();
    displayForecast();
    addRecentSearches();
    clearOldSearch();
  }
});
});
