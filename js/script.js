var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = $(".mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) { slideIndex = 1 }
    x[slideIndex - 1].style.display = "block";
    setTimeout(carousel, 3000); // Change image every 3 seconds
}


$("#getMovieDinnerInfo").on("click", function (event) {
    event.preventDefault();
    getMovie();
    
    renderInput();  
}) 


function getMovie() {

    var movieTitle = $("#movie-input").val().trim();
    var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=e58ef792d8f88d2594be55889e57e8aa&query=" + movieTitle + "&append_to_response=videos";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var movieInfoDisplay = $('<div style="margin-top:20px;margin-bottom:2px;margin-left:20px;margin-right:30px;font-size:12px;">');
        var title = response.results[0].original_title;
        var plot = response.results[0].overview;
        var released = response.results[0].release_date;
        var genre = response.results[0].genre_ids[0];
        
        storedInfo(title)
        getYelp(genre);

        var movieTitle = $("<h5></h5>").text(title);
        var plotInfo = $("<p>").text("Plot: " + plot);
        var releaseInfo = $("<p>").text("Released: " + released);

        movieInfoDisplay.append(movieTitle);
        movieInfoDisplay.append(plotInfo);
        movieInfoDisplay.append(releaseInfo);

        $("#movie-view").append(movieInfoDisplay);

        var movieImgDisplay = $('<div style="margin-top:20px;margin-bottom:2px;margin-left:36px;font-size:12px;">');

        var imgURL = response.results[0].poster_path;
        var img = $("<img>").attr("src", "https://image.tmdb.org/t/p/w200" + imgURL);
        movieImgDisplay.append(img);

        $("#movie-view").prepend(movieImgDisplay);
        
    })
};

function getYelp(genre) {
    var genreID = genre.toString();
    var foodChoicesArray = foodChoices[genreID];
    var Cuisine = foodChoicesArray[Math.floor(Math.random()*3)];
    var zipCode = $("#zip-code-input").val().trim();

    var baseURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?cc=US&location=" + zipCode + "&categories=" + Cuisine;
    console.log(baseURL);
    $.ajax({
        url: baseURL,
        headers: {
            'Authorization': 'Bearer FaCxUgHFTV2Lr8A77-yzvMxCHuxtSls3lpHAcf4Vyl75tvEq-J29nkZeRYZHhz--unL0b7aFAFYFrfpd6RhhRSg67b_53hXlbquPzOhE1U3diK56iMWGWygOoWbeX3Yx',

        },
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            // Grab the results from the API JSON return
            var totalresults = data.total;
            // If our results are greater than 0, continue
            if (totalresults > 0) {
                // Display a header on the page with the number of results
                $('#food-1').append('<h5 style="padding-left:35px;">Here are our dinner suggestions:</h5>');
                // Itirate through the JSON array of 'businesses' which was returned by the API

                $.each(data.businesses, function (i, item) {
                    if (i >= 3) {
                        return false;
                    }
                   
                    var image = item.image_url;
                    var name = item.name;
                    
                    var rating = item.rating;
                    var reviewcount = item.review_count;

                    var address = item.location.address1;
                    var city = item.location.city;
                    var state = item.location.state;
                    var zipcode = item.location.zip_code;
                    var RestaurantUrl = item.url
                    // Append our result into our page. Easier to call on one call for Yelp API. Need to random generate
                    return ($('#food-1').append('<div style="margin-top:25px;margin-bottom:30px;margin-left:20px;font-size:13px;"><a href= "' + RestaurantUrl +'" target="_blank"><img src="' + image + '" style="width:100px;height:95px;justify-content:center;"></a><br><b>' + name + '</b><br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>')

                    );
                });
            }
        }
    });
}

function renderInput() {
    $("#food-1").empty()
    $("#movie-view").empty()
    $("getMovieDinnerInfo").empty()
}

function storedInfo(movie) {
console.log(movie)
localStorage.setItem("lastMovie", movie);

}

var foodChoices = {
    //Action
    28: ["hotdog", "sandwiches", "burgers"],
    //Adventure
    12: ["pizza", "burgers", "hotdog"],
    //Animation
    16: ["comfortfood", "steakhouses", "soulfood"],
    //Comedy
    35: ["burgers", "thai", "mexican"],
    //Crime
    80: ["cheesesteaks", "chickenwings", "fishnchips"],
    //Documentary
    99: ["thai", "italian", "japanese"],
    //Drama
    18: ["steakhouse", "chinese", "seafood"],
    //Family
    10751: ["pizza", "mexican", "burgers"],
    //Fantasy
    14: ["italian", "pizza", "noodles"],
    //History
    36: ["french", "seafood", "cafes"],
    //Horror
    27: ["mexican", "steakhouses", "burgers"],
    //Music
    10402: ["pizza", "chinese", "sandwiches"],
    //Mystery
    9648: ["japanese", "chinese", "thai"],
    //Romance
    10749: ["cafes", "italian", "french"],
    //Science Fiction
    878: ["chinese", "hawaiian", "japanese"],
    //TV Movie
    10770: ["pizza", "chinese", "burgers"],
    //Thriller
    53: ["thai", "noodles", "japanese"],
    //War
    10752: ["cheesesteaks", "steakhouses", "fishnchips"],
    //Western
    37: ["diners", "steakhouses", "burgers"],
}