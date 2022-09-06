var apiKey = "bb7882d0e26c49b9d2b261aa31868471";
var searchForm = document.querySelector("#search-form");
var header = document.querySelector(".header")
var temp = document.querySelector("#tempHead")
var windHead = document.querySelector("#windHead")
var humidityHead = document.querySelector("#humidityHead")
var cards = document.querySelector("#cards")
var temp1 = document.querySelector("#temp1")
var cityButtons = document.querySelector("#buttons");

//var searchInput = document.querySelector("#text").value;

var cityList = []
function generateCityBtn(){
  if (localStorage.getItem("cityList")){
    cityList= JSON.parse(localStorage.getItem("cityList"))
  }
  cityButtons.innerHTML="" 
  for (i=0; i<cityList.length;i++){
    cityButtons.innerHTML=cityButtons.innerHTML + `<button type="button" id="miami-btn" class="btn btn-secondary w-100 mb-2">
    ${cityList[i]}
  </button>`
  }
  var buttons = document.querySelectorAll(".btn")
  for (i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click", function(){
      citySearch(this.textContent)
    })
  }

}
generateCityBtn()


function citySearch(citySearch) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (currentWeather) {
      console.log(currentWeather)
      if (cityList.includes(currentWeather.name)===false & currentWeather.name.length>0){
        cityList.push(currentWeather.name)
        localStorage.setItem("cityList", JSON.stringify(cityList))
      }
      generateCityBtn()
      header.innerHTML = currentWeather.name + moment(currentWeather.dt, "X").format(" (MM/DD/YYYY) ") + `              <img src=" http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png" alt="" />
      `; 
      tempHead.innerHTML = " Temp: " + currentWeather.main.temp + "℉"
      windHead.innerHTML = " Wind: " + currentWeather.wind.speed + " mph"
      humidityHead.innerHTML = " Humidity: " + currentWeather.main.humidity + "%"
    })
  //console.log(citySearch)

  var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + '&units=imperial' + "&appid=" + apiKey;

  fetch(requestUrl)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      displayCards(data);

    })


  function displayCards(data) {
    cards.innerHTML=""
    for (i = 0; i < data.list.length; i=i+8){
      cards.innerHTML= cards.innerHTML + `  <div class="col-sm-2">
      <div class="card" id="card1">
        <div class="card-body">
          <h5 class="card-title">${moment(data.list[i].dt, "X" ).format(" (MM/DD/YYYY) ")}</h5>
          <img src=" http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="" />;
          <p class="card-text" id="temp1">Temp:${data.list[i].main.temp}°</p>
          <p id="wind1">Wind: ${data.list[i].wind.speed} MPH</p>
          <p id="humidity1">Humidity: ${data.list[i].main.humidity}%</p>
        </div>
      </div>
    </div>`

    }
    console.log(cards.innerHTML)

  }
  // // function getAPI() {
  // //     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  // //   .then(function (response) {
  // //     return response.json();
  // //   })
  // //   .then(function (data) {
  // //     console.log(data);
  // //   });


}



console.log(searchForm);
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //capture input value using console.log below, store it in a variable => pass it in to two functions, one to capture current data the second to capture future
  console.log(event.target.children[0].children[0].value)

  if (event.target.children[0].children[0].value.length>0){
    citySearch(event.target.children[0].children[0].value)
  }
});



