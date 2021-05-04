/**************************************************************/
// ballpopgame.js
// Written by Travis cotter 2021
/**************************************************************/
var DETAILS = "userData";  

var userDetails = {
  uid:      '',
  email:    '',
  name:     '',
  photoURL: '',
	staff:		''
};

function setup() {
	fb_initialise();
	fb_login(userDetails);
  createCanvas(0, 0);
}

function draw() {
  background(220);
}

function startButton(){
	document.getElementById("s_lP").style.display = "none";
	document.getElementById("s_sP").style.display = "block";
}
/*function whypressthis(){
	alert ("Okay, awnser this");
	prompt ("is Bing Dumb?");
	alert ("Now awnser this");
	prompt ("Is twavis dumb?");
}*/