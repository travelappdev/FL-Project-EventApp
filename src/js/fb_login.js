window.fbAsyncInit = function() {

    FB.init({
        appId: '211283292620723',
        xfbml: true,
        version: 'v2.7'
    });

};

(function(d, s, id) {

    var js, fjs = d.getElementsByTagName(s)[0];

    if (d.getElementById(id)) {
        return;
    }

    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);

}(document, 'script', 'facebook-jssdk'));

function fbLogin() {

    FB.login(function(response) {
        if (response.status === "connected") {
            console.log("We are connected");
        } else if (response.status === "not_authorized") {
            console.log("We are not logged in.");
        } else {
            console.log("You are not in facebook.");
        }
    }, {scope: 'email'});

}

function getInfo(){

    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,picture.width(300).height(300)'}, 
        function(response){
        console.log(response.id);
        console.log(response.first_name);
        console.log(response.last_name);
        console.log(response.picture.data.url);
    })

}