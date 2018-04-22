  var config = {
    apiKey: "AIzaSyBsYR6OXOHsmMFQ0EqLhUtw3N1Gf8iDRB8",
    authDomain: "train-project-2010e.firebaseapp.com",
    databaseURL: "https://train-project-2010e.firebaseio.com",
    projectId: "train-project-2010e",
    storageBucket: "train-project-2010e.appspot.com",
    messagingSenderId: "725400376763"
  };
    firebase.initializeApp(config);

var database = firebase.database();

$("#addTrainButton").on("click", function (event) {
    event.preventDefault();

    // Gets user data
    var name = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var time = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(10,"days").format("X");
    var frequency = $("#frequency").val().trim();



    var addTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    };


    database.ref().push(addTrain);

   alert("New train has been added")

    // Clear boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

    return false;
});

// User adds an entry
database.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var time = snapshot.val().time;
    var frequency = snapshot.val().frequency;


  
  //  var formattedTime = moment(time, "HH:MM").subtract(1, "years");

    var remainder = moment().diff(moment.unix(time), "minutes")%frequency;
    var minutesAway = frequency - remainder;
    var arrivalTime = moment().add(minutesAway,"m").format("LT");



    //Display data in the table
    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + arrivalTime + "</td><td>" + minutesAway + "</td><td>");

});
