function onSuccess(googleUser) {

    var profile = googleUser.getBasicProfile();

    gapi.client.load('plus', 'v1', function () {
    
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
    
        //Display the user details
            request.execute(function (response) {

            //var profileHTML = '<div class="profile"><div class="head">Welcome '+
            //resp.name.givenName+'! <a href="javascript:void(0);
            //" onclick="signOut();">Sign out</a></div>';
            //profileHTML += '<img src="'+resp.image.url+
            //'"/><div class="proDetails"><p>'+resp.displayName+'</p><p>'+
            //resp.emails[0].value+'</p><p>'+resp.gender+'</p><p>'+resp.id+
            //'</p><p><a href="'+resp.url+'">View Google+ Profile</a></p></div></div>';

            console.log(response.displayName);
            console.log(response.emails[0].value);
            console.log(response.gender);
            console.log(response.id);
            console.log(response.image.url);

            $('#gSignIn').slideUp('slow');

        });
    });
}

function onFailure(error) {
    alert(error);
}

function renderButton() {

    gapi.signin2.render('gSignIn', {
        'scope': 'profile email',
        'width': 160,
        'height': 35,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });

}

function signOut() {

    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
        //$('#gSignIn').slideDown('slow');
        console.log("User signed out");
        renderButton();
    });

}