// Initialize Firebase
var config = {
    apiKey: "AIzaSyB1KZxoepwJ9dZu8moNhJmgDqlOHKWjWAw",
    authDomain: "choo-choo-4343d.firebaseapp.com",
    databaseURL: "https://choo-choo-4343d.firebaseio.com",
    projectId: "choo-choo-4343d",
    storageBucket: "choo-choo-4343d.appspot.com",
    messagingSenderId: "803440655254"
  };
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var train = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

// On click submit form
$(".submitBtn").on('click', function(){
    train = $(".trainName").val().trim();
    destination = $(".destination").val().trim();
    firstTrain = $(".firstTrain").val().trim();
    frequency = $(".frequency").val().trim();
  
    // Push data from form to Firebase
    database.ref().push({
        trainName: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    })
});