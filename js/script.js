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
    getYelp();
    getMovie();
    renderInput();  
    $("#find-movies").show();
}) 


function getMovie() {

    var movieTitle = $("#movie-input").val().trim();
    var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=e58ef792d8f88d2594be55889e57e8aa&query=" + movieTitle + "&append_to_response=videos";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var movieInfoDisplay = $('<div style="margin-top:20px;margin-bottom:2px;margin-left:50px;margin-right:30px;font-size:12px;">');
        var title = response.results[0].original_title;
        var plot = response.results[0].overview;
        var released = response.results[0].release_date;
        var genre = response.results[0].genre_ids[0];

        console.log(genre);

        var movieTitle = $("<h5></h5>").text(title);
        var plotInfo = $("<p>").text("Plot: " + plot);
        var releaseInfo = $("<p>").text("Released: " + released);

   

        movieInfoDisplay.append(movieTitle);
        movieInfoDisplay.append(plotInfo);
        movieInfoDisplay.append(releaseInfo);


        $("#movie-view").append(movieInfoDisplay);

        var movieImgDisplay = $('<div style="margin-top:20px;margin-bottom:2px;margin-left:50px;font-size:12px;">');

        var imgURL = response.results[0].poster_path;
        var img = $("<img>").attr("src", "https://image.tmdb.org/t/p/w300" + imgURL);
        movieImgDisplay.append(img);

        $("#movie-view").prepend(movieImgDisplay);
        
    })
};

function getYelp() {
    var zipCode = $("#zip-code-input").val().trim();

    var baseURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?cc=US&location=" + zipCode + "&categories=restaurants"
    $.ajax({
        url: baseURL,
        headers: {
            'Authorization': 'Bearer 7-D4nAqKTqKGKyAhkEZhnzdFCzZ02Vigx-oRKe4i4WmREcgloB8n6nJr-qAG2B7xbtMxXC-3Dj2xTP-EUx4mDjeNaglMpCl8T9WnehSynk_6OtDL-jP1DmbNZUDeX3Yx',

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
                $('#food-1').append('<h6 style="padding-left:35px;color:#ad1457;font-weight:bold;">Here are our dinner suggestions:</h6>');
                // Itirate through the JSON array of 'businesses' which was returned by the API

                $.each(data.businesses, function (i, item) {
                    if (i >= 3) {
                        return false;
                    }

                    var image = item.image_url;
                    var name = item.name;
                    var category = item.categories[0].title

                    var rating = item.rating;
                    var reviewcount = item.review_count;

                    var address = item.location.address1;
                    var city = item.location.city;
                    var state = item.location.state;
                    var zipcode = item.location.zip_code;
                    // Append our result into our page. Easier to call on one call for Yelp API. Need to random generate
                    return ($('#food-1').append('<div style="margin-top:25px;margin-bottom:30px;margin-left:35px;font-size:13px;"><img src="' + image + '" style="width:100px;height:95px;justify-content:center;"><br><b>' + name + ' under ' + category + ' Category</b> <br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>')

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


// function categories() {
//     if (getMovie() === response.results[0].genres.id[18]) {

//     }
// }
var foodChoices = {
    //Action
    28: ["Hot dogs", "Sandwiches", "Burgers"],
    //Adventure
    12: ["Pizza", "Burgers", "Hot dogs"],
    //Animation
    16: ["Comfort food", "Pizza", "Fast food"],
    //Comedy
    35: ["Burgers", "Fast food", "Mexican"],
    //Crime
    80: ["Cheesesteaks", "Chicken Wings", "Fish & Chips"],
    //Documentary
    99: ["French", "Italian", "Japanese"],
    //Drama
    18: ["Soul food", "Soup", "Italian"],
    //Family
    10751: ["Pizza", "Fast food", "Burgers"],
    //Fantasy
    14: ["Italian", "Pizza", "Noodles"],
    //History
    36: ["French", "Steakhouses", "Cafes"],
    //Horror
    27: ["Noodles", "Steakhouses", "Burgers"],
    //Music
    10402: ["Pizza", "Chinese", "Sandwiches"],
    //Mystery
    9648: ["Japanese", "Chinese", "Fish & Chips"],
    //Romance
    10749: ["Cafes", "Italian", "French"],
    //Science Fiction
    878: ["Chinese", "Hawaiian", "Japanese"],
    //TV Movie
    10770: ["Pizza", "Chinese", "Burgers"],
    //Thriller
    53: ["Pizza", "Noodles", "Japanese"],
    //War
    10752: ["Cheesesteaks", "Steakhouses", "Fish & Chips"],
    //Western
    37: ["Diners", "Steakhouses", "Burgers"],
}


// note: testing pulling api together
// var genre = response.Genre
// var category = item.categories[0].title


