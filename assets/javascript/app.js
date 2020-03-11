$(document).ready( function() {
    console.log("inside javascript file")
    var topics = ["Darth Vader", "Han Solo", "Luke Skywalker", "Princess Leia", "Boba Fett", "Chewbacca"];
    function renderButtons() {
        $("#gButtons").empty();
        console.log("inside render buttons")
        for (i = 0; i < topics.length; i++) {
            console.log(topics[i])
            var s = $("<button>");
            s.addClass("characters");
            s.attr("data-name", topics[i]);
            s.text(topics[i]);
            $("#gButtons").append(s);
        }
    }
    renderButtons();
    $("#add-character").on("click", function () {
        event.preventDefault();
        var people = $("#search").val().trim();
        topics.push(people);
        renderButtons();
    });
    $(document).on("click", ".characters", function() {
        var people = $(this).attr("data-name");
        console.log(people)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            people + "&api_key=U5WxbMbqNhv6gL64mRVkiZLv1Bc0tLhN&limit=10"
        //  AJAX request for the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response.data);
                var results = response.data;
                //$("#display-images").empty();
                // Loop
                for (var i = 0; i < results.length; i++) {
       
                    var peopleDiv = $("<div>");
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    p.append("<br/> Title: " + results[i].title);
                    
                    // Creating and storing an image tag
                    var charImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    charImage.attr("src", results[i].images.fixed_height_still.url);
                    charImage.attr("data-stop", results[i].images.fixed_height_still.url);
                    charImage.attr("data-animate", results[i].images.fixed_height.url);
                    charImage.attr("data-state", "stop");
                    charImage.addClass("gif");
                  
                    peopleDiv.append(p);
                    peopleDiv.append(charImage);
        
                    $("#display-images").append(peopleDiv);
                }
            });
    });
  
    
    $(document).on("click","gif",function(){
        console.log("inside animation")
        var state = $(this).attr("data-state");
        var still = $(this).attr("data-stop");
        var animate = $(this).attr("data-animate");
        if (state === "stop") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
            console.log(state)
        }
        else {
            $(this).attr("src", stop);
            $(this).attr("data-state", "stop");
            console.log(animate)
        }
    })
});