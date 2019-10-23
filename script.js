var recentSearches = ["example city 1", "example city 2"]

function displayWeatherInfo() {

    // var city = $(this).attr("data-name");
    var city = $("#city-input").val();
    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=9859fc6998842f2d4d3f91cde44162d0";
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=9859fc6998842f2d4d3f91cde44162d0";
    // var indexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37&APPID=9859fc6998842f2d4d3f91cde44162d0";
    // Creating an AJAX call for the specific city being searched
   
    $.ajax({
    //   url: queryURL,
      url: forecastURL,
      method: "GET"
    }).then(function(response) {

      // Creating a div to hold the city
    //   var cityDiv = $(".city-div");

    //   // Storing the city data
    //   var cityName = response.name;

    //   // Creating an element to have the city displayed
    //   var h4Tag = $(".city-name").text(cityName);

    //   // Displaying city
    //   cityDiv.append(h4Tag);
      console.log(response);

    //   // Storing the temperature
    //   var temperature = response.main.temp ;
    //   var tempFarenheit = (temperature - 273.15) * 1.8 + 32;
    //   var tempFixed = tempFarenheit.toFixed(1);
    //   var icon = response.weather[0].icon;

    //   //   Creating an element to hold the temperature
    //   var pTemp = $(".temp").text("Temperature: " + tempFixed + "°" + " " + icon);

    //   // Displaying the temperature
    //   cityDiv.append(pTemp);

    //   // Storing the humidity
    //   var humidity = response.main.humidity;

    //   // Creating an element to hold the humidity
    //   var pHumid = $(".humid").text("Humidity: " + humidity);

    //   // Appending the humidity
    //   cityDiv.append(pHumid);
      
    //   // Storing the wind speed
    //   var windSpeed = response.wind.speed;

    //   // Creating an element to hold the wind speed
    //   var pWind = $(".wind-speed").text("Wind Speed: " + windSpeed);

    //   // Appending the wind speed
    //   cityDiv.append(pWind);

    //   // Storing the UV Index
    //   var UVIndex = response.UVIndex;

    //   // Creating an element to hold the humidity
    //   var pIndex = $("<p>").text("UV Index: " + UVIndex);

    //   // Appending the humidity
    //   cityDiv.append(pIndex);

    


    // Storing Day One
    var dayOne = response.list[0].dt_txt;

    // Appending Day Two Forecast

    // Storing Day Two
    var dayTwo = response.list[1].dt_txt;

    // Appending Day Three Forecast

    // Storing Day Three
    var dayThree = response.list[2].dt_txt;

    // Appending Day Four Forecast

    // Storing Day Four
    var dayFour = response.list[3].dt_txt;

    // Appending Day Five Forecast

    // Storing Day Five
    var dayFive = response.list[4].dt_txt;
    });

  }

  $("#button-addon2").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var city = $("#city-input").val().trim();

    // Adding movie from the textbox to our array
    recentSearches.push(city);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  $(document).on("click", "#button-addon2", displayWeatherInfo);