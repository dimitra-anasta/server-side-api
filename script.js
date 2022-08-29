var apiKey = "bb7882d0e26c49b9d2b261aa31868471";
var searchForm = document.querySelector("#search-form");

//var searchInput = document.querySelector("#text").value;

function citySearch(citySearch) {
  console.log(citySearch)
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + '&units=imperial' + "&appid=" + apiKey;
    // make lat + long variables to pass into second API, set them from the first API's response.\

console.log(requestUrl)
    fetch(requestUrl)

    .then(function(response){
        console.log(response)
        return response.json();
    } )
        .then (function(data) {
        
        displayCards(data);

})

function displayCards(data){
  console.log(data)

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
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    //capture input value using console.log below, store it in a variable => pass it in to two functions, one to capture current data the second to capture future
    console.log(event.target.children[0].children[0].value)
    

     citySearch(event.target.children[0].children[0].value)
});



