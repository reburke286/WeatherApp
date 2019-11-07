var recentSearches = ["example city 1", "example city 2"];
var latPush = [""];
var lonPush = [""];


function displayWeatherInfo() {

    var city = $("#city-input").val();
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
      var h3Tag = $(".city-name").text(cityName);

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
      var pTemp = $(".temp").text("Temperature: " + tempFixed + "°");
      pTemp.append(iconImageApp);

      // Displaying the temperature
      cityDiv.append(pTemp);

      // Storing the humidity
      var humidity = response.main.humidity;

      // Creating an element to hold the humidity
      var pHumid = $(".humid").text("Humidity: " + humidity + "%");

      // Appending the humidity
      cityDiv.append(pHumid);
      
      // Storing the wind speed
      var windSpeed = response.wind.speed;

      // Creating an element to hold the wind speed
      var pWind = $(".wind-speed").text("Wind Speed: " + windSpeed);

      // Appending the wind speed
      cityDiv.append(pWind);
      findUVIndex();
    });

  };

  function findUVIndex() {
      console.log(latPush[1]);
      console.log(lonPush[1]);

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
      console.log(response);
   
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
    // Appending Day One Forecast
    dayTwoDiv.append(pDayTwoDate);
    dayTwoDiv.append(dayTwoIconImageApp);
    dayTwoDiv.append(pTempDayTwo);
    dayTwoDiv.append(pHumidTwo);


    // Appending Day Two Forecast

    // // Storing Day Three
    // var dayThree = response.list[2].dt_txt;

    // // Appending Day Three Forecast

    // // Storing Day Four
    // var dayFour = response.list[3].dt_txt;

    //  // Appending Day Four Forecast

    // // Storing Day Five
    // var dayFive = response.list[4].dt_txt;

    //  // Appending Day Five Forecast

  })

    
};   

  $(document).on("click", "#button-addon2", displayWeatherInfo);
  $(document).on("click", "#button-addon2", displayForecast);
  $("#button-addon2").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var city = $("#city-input").val().trim();

    // Adding movie from the textbox to our array
    recentSearches.push(city);
    console.log(recentSearches);

    // Calling renderButtons which handles the processing of our movie array
    // renderButtons();
  });