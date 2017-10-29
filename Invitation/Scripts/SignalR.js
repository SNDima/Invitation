var startTimer = function() {};
var sendMessage = function(message) { };
var showQuestionTime = function(time) {};

$(function () {
    // Declare a proxy to reference the hub. 
    var timer = $.connection.timerHub;
    var eventsHub = $.connection.eventsHub;

    // Create a function that the hub can call to show time left.
    timer.client.showTime = function (time) {
        if (time == 0) {
            $("#timer-message").text("Another attempt in " + time + " seconds.")
            setTimeout(function () {
                viewModel.setStatus(STATUSES.YES_SELECTED);
                viewModel.updateQuestion(noQuestions);
            }, 1500)
        } else {
            $("#timer-message").text("Another attempt in " + time + " seconds.")
        }
    };
    // Start the connection.
    $.connection.hub.start().done(function () {
        startTimer = function startTimer() {
            $.connection.timerHub.server.startTimer();
        }

        sendMessage = function sendMessage(message) {
            $.connection.eventsHub.server.sendMessage(message);
        }

        showQuestionTime = function showQuestionTime(time) {
            $.connection.eventsHub.server.showQuestionTime(time);
        }

        //$('#sendmessage').click(function () {
        // Call the Send method on the hub. 
        //chat.server.send($('#displayname').val(), $('#message').val());
        // Clear text box and reset focus for next comment. 
        //$('#message').val('').focus();
        //});
    });
});
