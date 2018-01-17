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

// On click submit form
$(".submitBtn").on('click', function(){
    // Trim values from input
    var train = $(".trainName").val().trim();
    var destination = $(".destination").val().trim();
    var firstTrain = $(".firstTrain").val().trim();
    var frequency = $(".frequency").val().trim();
  
    // Push data from form to Firebase
    database.ref().push({
        trainName: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    })
});

// Check values via console and append it to new data row
database.ref().on("child_added", function(childSnapshot) {
    
    // Log values of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

    // Create variable for train frequency
    var tfrequency = childSnapshot.val().frequency;

    // Pushed back 1 year to make sure it comes before current time
    var convertedDate = moment(childSnapshot.val().firstTrain, 'hh:mm').subtract(1, 'years');
    var trainTime = moment(convertedDate).format('HH:mm');
    var currentTime = moment();

    // Pushed back 1 year to make sure it comes before current time
    var firstTimeConverted = moment(trainTime,'hh:mm').subtract(1, 'years');
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tfrequency;

    // Create variables for minutes til next train
    var tMinutesTrain = tfrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTrain, 'minutes').format('HH:mm')

    // Append data to new row
    $(".table").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" +
    childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency +
    "</td><td>" + trainTime + "</td><td>" + tMinutesTrain + "</td></tr>")

// Error logging
},function(errorObject) {
    console.log('Errors handled: ' + errorObject.code);
  });

// Refresh every minute to update
setInterval(function(){location.reload();}, 60000);