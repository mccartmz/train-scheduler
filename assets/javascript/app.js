var config = {
    apiKey: "AIzaSyCEkaPMTXIXWUMpktD08z7ZR5TVh6cNeXw",
    authDomain: "project-1-25453.firebaseapp.com",
    databaseURL: "https://project-1-25453.firebaseio.com",
    projectId: "project-1-25453",
    storageBucket: "project-1-25453.appspot.com",
    messagingSenderId: "736620026938"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#addTrain").on("click", function (event) {
    event.preventDefault();

// Get user data
    var name = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var time = moment($("#firstTrainTime").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("#frequency").val().trim();


    var addTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    };

    database.ref().push(addTrain);

// Clear boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

});

// User adds an entry
    database.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var time = snapshot.val().time;
    var frequency = snapshot.val().frequency;



    var firstTimeConverted = moment.unix(time, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var remainder = diffTime % frequency;
    var minutesAway = frequency - remainder;
    console.log(minutesAway);


    var nextTrainTime = moment().add(minutesAway, "minutes");
    var nextTrain = (nextTrainTime).format("HH:MM");



// Display data in the table
    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td><td>");

});