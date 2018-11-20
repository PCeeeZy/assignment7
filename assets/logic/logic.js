// Steps to complete:

// 1. Initialize Firebase

// 2. Create button for adding new trains - then update the html + update the database

// 3. Create a way to retrieve train schedules from the train database.

// 4. Create a way to calculate the next arrival. Using start time and frequency
//    Then use moment.js formatting to display in HH:MM AM/PM .

// 5. Create a way to calculate the minutes away.  Use difference between now and next arrival
//    Then use moment.js formatting to display minutes remaining.

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyCEF9fQk-tudO5Img7ZFXilUstv3ZMxFqw",
    authDomain: "trainscheduler-34fc5.firebaseapp.com",
    databaseURL: "https://trainscheduler-34fc5.firebaseio.com",
    projectId: "trainscheduler-34fc5",
    storageBucket: "trainscheduler-34fc5.appspot.com",
    messagingSenderId: "28352780900"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#train-start-input").val().trim(), "HH:mm");
    var trainFreq = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStart,
        rate: trainFreq
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.rate);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("destination-input").val("");
    $("#train-start-input").val("");
    $("#frequency-input").val("");
});

// 3. Create a way to retrieve train schedules from the train database.
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().rate;

    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFreq);

    // Prettify the train start
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");

    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);

    // // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $('<th scope="col">').text(trainName),
        $('<th scope="col">').text(trainDestination),
        $('<th scope="col">').text(trainFreq),

        $('<th scope="col">').text("Need to complete"),
        $('<th scope="col">').text("Need to complete")
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
