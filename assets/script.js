console.log(6+5);

setTimeout(function(){
    location = ''
  },60000)


var config = {
    apiKey: "AIzaSyC4cwJ8FAZfErvPai7pcN0Kr8B6GlirJkw",
    authDomain: "paintrainstation-e2a0a.firebaseapp.com",
    databaseURL: "https://paintrainstation-e2a0a.firebaseio.com",
    storageBucket: "paintrainstation-e2a0a.appspot.com",
    messagingSenderId: "567971508997"
};
firebase.initializeApp(config);

var database = firebase.database();


var trainName;
  var destination;
  var startTime;
  var frequency;


  $("#submit").on("click", function(event) {


      trainName = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      startTime = $("#startTime-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      console.log(frequency);
      database.ref().push({
          trainName: trainName,
          destination: destination,
          startTime: startTime,
          frequency: frequency
      });
      return false;
  });




  database.ref().on("child_added", function(snap) {
      var startTime = snap.val().startTime;
      var convertedTime = moment(startTime, "HH:mm");
      convertedTime.format("HHmm");
      console.log("user entered: " + convertedTime.format("HHmm"));
      //Difference from start time until now in minutes
      var currentTime = moment().format("HH:mm");
      console.log("Current time = " + currentTime);
      var timeFromStart = moment().diff(convertedTime, "minutes");
      var minTillNext = (timeFromStart % snap.val().frequency);
      console.log(minTillNext.toString());
      console.log("Minutes until Next Train: " + minTillNext);
      // console.log("Calc test: " + (currentTime) + minTillNext);

      //minutes time till next

      var nextArrival = moment().add(minTillNext, 'minutes').format("HH:mm");
      // var nextArrival = currentTime;
      console.log("testing time " + nextArrival);
      console.log(nextArrival);
      // console.log(nextArrival);
      // moment().add(Duration);

      var newRow = $("<tr>");
      newRow.append($("<td>" + snap.val().trainName + "</td>"));
      newRow.append($("<td>" + snap.val().destination + "</td>"));
      newRow.append($("<td>" + snap.val().frequency + "</td>"));
      newRow.append($("<td>" + nextArrival + "</td>"));
      newRow.append($("<td>" + minTillNext + "</td>"));
      $("tbody").append(newRow);
  });