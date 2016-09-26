window.fbAsyncInit = function() {

    FB.init({
        appId: '211283292620723',
        xfbml: true,
        status: true,
        cookie: true,
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
                    fields: 'name,id,picture.width(300).height(300),email,hometown,gender,birthday'
                },
                function(response) {

                    var age = Math.floor((Date.now() - Date.parse(response.birthday)) / (1000 * 60 * 60 * 24 * 364.75));

                    $.post('http://localhost:8000/api/users/', {

                        "email": response.id+'@com',
                        "username": response.name,
                        "userPhoto": response.picture.data.url,
                        "homeTown": response.hometown.name,
                        "gender": response.gender,
                        "age": age,
                        "password": 'pass'

                    });

                    $.get(`http://localhost:8000/api/users/${response.id}@com`, function(resp) {

                        document.cookie = `email=${resp.email}`;
                        document.cookie = `password=${resp.password}`;
                        document.cookie = `username=${resp.username}`;
                        document.cookie = `age=${resp.age}`;
                        document.cookie = `phone=${resp.phone}`;
                        document.cookie = `homeTown=${resp.homeTown}`;
                        document.cookie = `gender=${resp.gender}`;
                        document.cookie = `subscribed=${resp.subscribed}`;
                        document.cookie = `createdEvents=${resp.createdEvents}`;
                        document.cookie = `userPhoto=${resp.userPhoto}`;

                    });

                    /*console.log(response.hometown.name);
                    console.log(response.gender);
                    console.log(age);
                    console.log(response.name);
                    console.log(response.picture.data.url);*/
                })

        } else if (response.status === "not_authorized") {
            console.log("You are not logged in.");
        } else {
            console.log("You are not logged in facebook.");
        }
    });
}



function fbLogout() {

    FB.logout(function(response) {

        console.log('FB user logged out');

        loginType = 'none';

    })

}


function shareFB(name, picture, caption, description) {

    FB.ui({
        method: 'feed',
        name: name,
        link: "https://www.google.com.ua/",
        picture: picture,
        caption: caption,
        description: description
    }, function(error) {

        console.log(JSON.stringify(error, undefined, 2));

    });


}


