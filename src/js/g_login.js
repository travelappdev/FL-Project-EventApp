function onSuccess(googleUser) {
	
	loginType = 'g';
    var profile = googleUser.getBasicProfile();
 	
 	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());
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

};

function gSignout() {

    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
        console.log("Google User signed out");
        renderButton();
        loginType = 'simple';
    });

}