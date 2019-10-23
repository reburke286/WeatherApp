var recentSearches = ["example city 1", "example city 2"]

function displayWeatherInfo() {

    var city = $(this).attr("data-name");
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=9859fc6998842f2d4d3f91cde44162d0";
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=9859fc6998842f2d4d3f91cde44162d0";
    // Creating an AJAX call for the specific city being searched
   
    $.ajax({
      url: queryURL,
      url: forecastURL,
      method: "GET"
    }).then(function(response) {

      // Creating a div to hold the city
      var cityDiv = $(".city-div");

      // Storing the city data
      var cityName = response.City;

      // Creating an element to have the city displayed
      var h4Tag = $("<h4>").text(cityName);

      // Displaying city
      cityDiv.append(h4Tag);

      // Storing the temperature
      var temperature = response.Temperature;

      // Creating an element to hold the temperature
      var pTemp = $("<p>").text("Temperature: " + temperature + weather.icon);

      // Displaying the temperature
      cityDiv.append(pTemp);

      // Storing the humidity
      var humidity = response.Humidity;

      // Creating an element to hold the humidity
      var pHumid = $("<p>").text("Humidity: " + humidity);

      // Appending the humidity
      cityDiv.append(pHumid);
      
      // Storing the wind speed
      var windSpeed = response.wind.speed;

      // Creating an element to hold the humidity
      var pWind = $("<p>").text("Wind Speed: " + windSpeed);

      // Appending the humidity
      cityDiv.append(pWind);

      // Storing the humidity
      var UVIndex = response.UVIndex;

      // Creating an element to hold the humidity
      var pIndex = $("<p>").text("UV Index: " + UVIndex);

      // Appending the humidity
      cityDiv.append(pIndex);
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