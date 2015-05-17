

// handlers

/*
    NAME DIALOG
*/
$("#name-form").on("submit", function(event){
    var data = { name: $("#name-input").val() };

    $.post( "http://my-server.com/flakes.php", data)
      .done(function( data ) {
        console.log(data);
        renderNameData($("#name-data"), data);    
    });
    
    // prevent default submit behavior
    return false;
});

// renders the tumblr photo data into a gallery container
function renderNameData($target, data) {
    $target.empty();
    for(var i = 0; i < data.data.length; i++){
        $target.append($("<li>" + data.data[i] + "</li>"));
    }
}


/*
    DETAILS PAGE
*/
$("#details").on("pagebeforeshow", function(event){
        var data = $("#details").data("post");
        if (data){
            var post = JSON.parse(data);
            $("#details [data-role=content]").empty().append("<h1>"+post.date+"</h1>"+post["photo-caption"]);
        } else {
            $.mobile.pageContainer.pagecontainer("change","#home");
        }
    }
).on("pagehide", function(event){
        $("#details [data-role=content]").empty();
    }
);



/*
    GALLERY PAGE
*/
var watchId, loaded = false;
$("#gallery").on("pageshow", function(event){
    if (!loaded){
        // load tumblr data
        $.mobile.loading( "show");
        $.ajax({
            url: "http://flurryflakes.tumblr.com/api/read/json?num=50&type=photo",  
            type: "GET",
            dataType: "jsonp",
            cache: false,
            crossDomain: true,
            processData: true,
            success: function(result) 
            {   
                window.alert(result);
                $.mobile.loading( "hide");
                renderTumblrData($("#gallery-img-container"), result);
                loaded = true;
            },
            error: function(e){  
                $.mobile.loading( "hide");
            }   
        });
    }

    // listen for accelerator
    var posX = 0;
    var options = { frequency: 100 }; 
    
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    function onSuccess(acceleration) {
        if (Math.abs(acceleration.x)>4){
            posX += 20*acceleration.x;
            $("#gallery-img-container").css({"left": posX+"px"});
        }
    };

    function onError() {
        console.log("error");
    };

}).on("pagehide", function(event){
       navigator.accelerometer.clearWatch(watchID); 
    }
);

// renders the tumblr photo data into a gallery container
function renderTumblrData($target, data) {
    for(var i = 0; i < data.posts.length; i++){
        $target.append($("<a href='#details' data-transition='slide'><img src="+data.posts[i]["photo-url-500"]+"></a>"));
        $target.find("img:last").data("post", JSON.stringify(data.posts[i]));
        console.log($target.find("img:last"));
    }

    $target.find("img").on("tap", function() {
        var $this = $(this);
        $("#details").data("post", $this.data("post"));
    });

}
