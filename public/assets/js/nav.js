$(function(){

    //Initial sign in check...
    // This is happening in nav.js because the nav bar loads on every page
    // except the loggin page. So we can do this with the partial.
    console.log(localStorage.getItem("token"));

    $.post("/", {token: window.localStorage.getItem("token")}).then(function(res){
        console.log("what is here?", res);
        if(!res) {
            window.localStorage.clear();
            window.location.href = "/";
        } else {
            console.log("User authenticated: " + res.user_name);
            $("#coinCountFill").html("<p> Coins: "+ res.coin_count +"</p>");


        }
    });

    $(".button-collapse").sideNav();

    //Add Coins to account.
    $("#coinBtn").on("click", function(){
        $.post("/", {token: window.localStorage.getItem("token")}).then(function(res){
            if(!res) {
                window.localStorage.clear();
                window.location.href = "/";
            } else {

                var username = res.user_name;
                var coin = res.coin_count += 100;

                $("#coinCountFill").html("<p> Coins: "+ coin +"</p>");

                $.ajax({
                    method: "PUT",
                    url: "/api/addCoin",
                    data: {
                        coin: coin,
                        username: username
                    }
                }).done(console.log("Coin count Updated"));
            }
        })
    });


});
