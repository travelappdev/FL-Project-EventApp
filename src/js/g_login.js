var auth2;
var googleUser = {};


function initClient() {

	gapi.load('auth2', function() {

		auth2 = gapi.auth2.init({
			client_id: '828555280883-gnki4fgfl5p1lss9froaa6u8n77bld8j.apps.googleusercontent.com',
			cookiepolicy: 'single_host_origin'
		});

		// Attach the click handler to the sign-in button
		attachSignin(document.getElementById('g_l'));

	});
};

function attachSignin(element) {
	auth2.attachClickHandler(element, {}, onSuccess, onFailure);
}


function onSuccess(googleUser) {

	loginType = 'g';
	var profile = googleUser.getBasicProfile();

	$.post('http://localhost:8000/api/users/', {
		"email": `${profile.getEmail()}aa`,
		"username": `${profile.getName()}`,
		"userPhoto": `${profile.getImageUrl()}`,
		"password": 'somePassword'
	});

	$.get(`http://localhost:8000/api/users/${profile.getEmail()}aa`, function(response) {
		document.cookie = `email=${response.email}`;
		document.cookie = `password=${response.password}`;
		document.cookie = `username=${response.username}`;
		document.cookie = `age=${response.age}`;
		document.cookie = `phone=${response.phone}`;
		document.cookie = `homeTown=${response.homeTown}`;
		document.cookie = `gender=${response.gender}`;
		document.cookie = `subscribed=${response.subscribed}`;
		document.cookie = `createdEvents=${response.createdEvents}`;
		document.cookie = `userPhoto=${response.userPhoto}`;
	});

	console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());

}

function onFailure(error) {
	//alert(JSON.stringify(error, undefined, 2));
}


function gSignout() {

	var auth2 = gapi.auth2.getAuthInstance();

	auth2.signOut().then(function() {
		loginType === 'g' ? console.log("Google User signed out") : 1;
		attachSignin(document.getElementById('g_l'));
		loginType = 'none';

	});

}

var loginType = 'simple';
initClient();
