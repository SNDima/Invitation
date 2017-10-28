$(function () {
    // Declare a proxy to reference the hub. 
    var timer = $.connection.timerHub;
    // Create a function that the hub can call to show time left.
    timer.client.showTime = function (time) {
        if (time == 0) {
            $("#timer-message").text("Another attempt in " + time + " seconds.")
            setTimeout(function() {
                viewModel.init(start, noQuestions);
            }, 1000)
        } else {
            $("#timer-message").text("Another attempt in " + time + " seconds.")
        }
    };
    // Start the connection.
    $.connection.hub.start().done(function () {
        //$('#sendmessage').click(function () {
        // Call the Send method on the hub. 
        //chat.server.send($('#displayname').val(), $('#message').val());
        // Clear text box and reset focus for next comment. 
        //$('#message').val('').focus();
        //});
    });
});

function startTimer() {
    $.connection.timerHub.server.startTimer();
}