/**************************************************************/
// fb_call.js
// Written by Travis cotter 2021
/**************************************************************/
const PADDING  = 15;
const PANELW   = 130;
const NEXTLINE = 30;

/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/
// database variables
var DETAILS = "userData";      //<== INSERT YOUR FIREBASE PATH NAME HERE

var loginStatus = ' ';
var readStatus  = ' ';
var writeStatus = ' ';

var userDetails = {
  uid:      '',
  email:    '',
  name:     '',
  photoURL: '',
	staff:		''
};
var playerScore = {
	score:    '',
	uid:      ''
}

var dbArray = [];
/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/


/**************************************************************/
// login()
// Input event; called when user clicks LOGIN button
// Logs user into firebase using Google login
// Input:
// Return:
/**************************************************************/
function login() {
  fb_login(userDetails);
}

/**************************************************************/
// readAll()
// Input event; called when user clicks READ ALL button
// Read all firebase records
// Input:
// Return:
/**************************************************************/
function readAll() {
  // CALL YOUR READ ALL FUNCTION        <=================
  fb_readAll(DETAILS, dbArray);
}

/**************************************************************/
// readRec()
// Input event; called when user clicks READ A RECORD button
// Read a specific firebase record
// Input:
// Return:
/**************************************************************/
function readRec() {
  // CALL YOUR READ A RECORD FUNCTION    <=================
  fb_readRec(DETAILS, userDetails.uid, userDetails, playerScore.uid, playerScore);
}

/**************************************************************/
// writeRec()
// Input event; called when user clicks WRITE A RECORD button
// Write a record to firebase
// Input:
// Return:
/**************************************************************/
function writeRec() {
  if (userDetails.uid != '') {
    userDetails.score = Number(prompt("enter the user's score"));
    
    // CALL YOUR WRITE A RECORD FUNCTION    <=================
    fb_writeRec(DETAILS, userDetails.uid, userDetails, playerScore.uid, playerScore);
  }
  else {
    dbScore     = '';
    writeStatus = '';
    loginStatus = 'not logged in';
  }
}

/**************************************************************/
// logout()
// Input event; called when user clicks LOGOUT button
// Logs user out of firebase 
// Input:
// Return:
/**************************************************************/
function logout() {
  fb_logout();
}

/**************************************************************/
//    END OF PROGRAM
/**************************************************************/