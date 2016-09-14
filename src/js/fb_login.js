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

    loginType = 'fb';
    FB.login(function(response) {
        
        if (response.status === "connected") {
            FB.api('/me', 'GET', {
                    fields: 'first_name,last_name,id,picture.width(300).height(300)'
                },
                function(response) {
                    console.log(response.id);
                    console.log(response.first_name);
                    console.log(response.last_name);
                    console.log(response.picture.data.url);
                })
        } else if (response.status === "not_authorized") {
            console.log("You are not logged in.");
        } else {
            console.log("You are not in facebook.");
        }
    });

}

function fbGetInfo() {

    FB.api('/me', 'GET', {
            fields: 'first_name,last_name,id,picture.width(300).height(300)'
        },
        function(response) {
            console.log(response.id);
            console.log(response.first_name);
            console.log(response.last_name);
            console.log(response.picture.data.url);
        })

}

function fbLogout() {
    FB.logout(function(response) {
        console.log('FB user logged out');
        renderButton();
        loginType = 'simple';
    })
}