console.log(6+5);

var config = {
    apiKey: "AIzaSyC4cwJ8FAZfErvPai7pcN0Kr8B6GlirJkw",
    authDomain: "paintrainstation-e2a0a.firebaseapp.com",
    databaseURL: "https://paintrainstation-e2a0a.firebaseio.com",
    storageBucket: "paintrainstation-e2a0a.appspot.com",
    messagingSenderId: "567971508997"
};
firebase.initializeApp(config);

var database = firebase.database();


var name = "";
var role = "";
var startDate = "";
var rate = 0;

// Capture Button Click
$("#add-user").on("click", function() {



    name = $("#name-input").val().trim();
    role = $("#role-input").val().trim();
    startDate = $("#startDate-input").val().trim();
    rate = $("#rate-input").val().trim();

    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        rate: rate
    });


    // console.log(name);
    // console.log(role);
    // console.log(startDate);
    // console.log(rate);


    database.ref().on("child_added", function(childSnapshot) {

        //childSnapshot.val(); //This is the data

        $(".employeeInfo").append("<td>" + childSnapshot.val().name);
        $(".employeeInfo").append("<td>" + childSnapshot.val().role);
        $(".employeeInfo").append("<td>" + childSnapshot.val().startDate);
        $(".employeeInfo").append("<td>" + childSnapshot.val().rate);


        //console.log("here");
    });



    // Don't refresh the page!
    return false;
});
