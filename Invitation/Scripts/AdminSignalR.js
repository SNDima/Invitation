$(function () {
    // Declare a proxy to reference the hub. 
    var timer = $.connection.timerHub;
    var eventsHub = $.connection.eventsHub;

    eventsHub.client.sendMessage = function (message) {
        var encodedMsg = $('<div />').text(message).html();
        $('#events').append('<li>' + encodedMsg + '</li>');
        var elem = document.getElementById('admin-div');
        elem.scrollTop = elem.scrollHeight;
    };

    timer.client.showTime = function (time) {
        $("#timer-div").show();
        if (time == 0) {
            $("#timer-div").hide();
        } else {
            $("#timer-p").text("Relax " + time + " seconds.")
        }
    };

    eventsHub.client.showQuestionTime = function (time) {
        $("#timer-div").show();
        if (time == 0) {
            $("#timer-div").hide();
        } else {
            $("#timer-p").text("The time left to answer: " + time + " seconds.")
        }
    };

    // Start the connection.
    $.connection.hub.start().done(function () {

    });
});