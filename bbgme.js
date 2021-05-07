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