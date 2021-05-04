/**************************************************************/
// fb_io.js
// Written by Travis cotter   2021
/**************************************************************/

/**************************************************************/
// fb_initialise()
// Called by setup
// Initialize firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_initialise() {
  console.log('fb_initialise: ');
	 var firebaseConfig = {
    apiKey: "AIzaSyAgpHx2oWmtozBfneJLA-uE0u9LgzeJIho",
    authDomain: "comp-assestment-travis.firebaseapp.com",
    projectId: "comp-assestment-travis",
    storageBucket: "comp-assestment-travis.appspot.com",
    messagingSenderId: "993729636313",
    appId: "1:993729636313:web:2a74a5468d0806d7b85bc8",
    measurementId: "G-R8P3M4B5MB"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);	
		
  database = firebase.database();
}

/**************************************************************/
// fb_login(_dataRec)
// Login to Firebase
// Input:  to store user info in
// Return: n/a
/**************************************************************/
function fb_login(_dataRec) {
  console.log('fb_login: dataRec= ' + _dataRec);
  firebase.auth().onAuthStateChanged(newLogin);
  
  function newLogin(user) {
	if (user) {
	  // user is signed in
      _dataRec.uid      = user.uid;
      _dataRec.email    = user.email;
      _dataRec.name     = user.displayName;
      _dataRec.photoURL = user.photoURL;
			_dataRec.staff		= user.staff
      loginStatus = 'logged in';

			fb_readRec(DETAILS, _dataRec.uid, _dataRec, _processData)
	}
	else {
	  // user NOT logged in, so redirect to Google login
      _dataRec     = {};
      loginStatus  = 'logged out';
      console.log('fb_login: status = ' + loginStatus);
      
	  var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
	}
  }
}

/**************************************************************/
// fb_logout()
// Logout of Firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_logout() {
  console.log('fb_logout: ');
  firebase.auth().signOut();
}

/**************************************************************/
// fb_writeRec(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return: 
/**************************************************************/
function fb_writeRec(_path, _key, _data) { 
    console.log('fb_WriteRec: path= ' + _path + '  key= ' + _key +
                 '  data= ' + _data.name + '/' + _data.score);
		
		writeStatus = "waiting";
		fixtime();
		firebase.database().ref(_path + '/' + _key).set(_data);
		function fixtime(error) {
			if (error){
			writeStatus = "Faliure";
			console.log(error);
			}
			else {
			writeStatus = "Ok";
			}
		}
		console.log("fb_writeRec exit")
}

/**************************************************************/
// fb_readAll(_path, _data)
// Read all DB records for the path
// Input:  path to read from and where to save it
// Return:
/**************************************************************/
function fb_readAll(_path, _data) {
  console.log('fb_readAll: path= ' + _path);
	readStatus = "waiting";
	firebase.database().ref(_path).once("value", gotRecord, readErr);

	function gotRecord(snapshot){
		if(snapshot.val() == null){
			readStatus = "no record";
		}
		else {
			readStatus = "Ok";
			let dbData	= snapshot.val();
			console.log(dbData);
			let dbKeys = Object.keys(dbData);
			console.log(dbKeys);
			let key = dbKeys[0];
			console.log (dbData[key]);

			for (i=0; i < dbKeys.length; i++){
				let key = dbKeys[i];
				_data.push({
					name:  dbData[key].name,
					score: dbData[key].score
				});
			}
		}
	}

	function readErr(error){
		readStatus = "Fail";
		console.log (error);
	}
}

/**************************************************************/
// fb_readRec(_path, _key, _data)
// Read a specific DB record
// Input:  path & key of record to read and where to save it
// Return:  
/**************************************************************/
function fb_readRec(_path, _key, _data, _processData) {	
  console.log('fb_readRec: path= ' + _path + '  key= ' + _key);

	readStatus = "waiting";
	firebase.database().ref(_path + "/" + _key).once("value", gotRecord, readErr);

	function gotRecord(snapshot){
		if(snapshot.val() == null){
			readStatus = "no record";
		}
		else {
			readStatus = "Ok";
			console.log (snapshot.val() );
		}
	}

	function readErr(error){
		readStatus = "Fail";
		console.log (error);
	}
}

/**************************************************************/
//    END OF MODULE
/**************************************************************/