function start() {
    if (viewModel.status() == STATUSES.INITIAL) {
        $("#hello").show();
        viewModel.sendSms("Vera's come in.");
        setTimeout(function() {
                sendMessage("Vera's come in.");
                showFirstQuestion();
            },
            2000);
    }
    if (viewModel.status() == STATUSES.HELLO_SHOWN) {
        showFirstQuestion();
    }
    if (viewModel.status() == STATUSES.YES_SELECTED) {
        processQuestion();
    }
    if (viewModel.status() == STATUSES.ANSWERED) {
        showChoicePartial();
    }
    if (viewModel.status() == STATUSES.WAITING) {
        showTimerMessage();
    }
    if (viewModel.status() == STATUSES.BEFORE_READY) {
        showReadyGroup();
    }
    if (viewModel.status() == STATUSES.AFTER_DECISION) {
        showFinished();
    }
}

function showFirstQuestion() {
    sendMessage("The first question is shown.");
    if (viewModel.status() != STATUSES.HELLO_SHOWN) {
        viewModel.setStatus(STATUSES.HELLO_SHOWN);
    }
    $("#hello").hide();
    $("#are-you-sure").show();
}

function showReadyGroup() {
    $("#timer-message").hide();
    $("#are-you-ready").show();
}

$("#yes-button").click(function () {
    sendMessage("Vera's clicked yes to the first question.");
    viewModel.setStatus(STATUSES.YES_SELECTED);
    $("#are-you-sure").hide();
    $("#yes-result").show();
    setTimeout(process3, 3000);
});

$("#yes-ready-button").click(function () {
    sendMessage("Vera's clicked yes to the are you ready question.");
    viewModel.setStatus(STATUSES.YES_SELECTED);
    $("#are-you-ready").hide();
    process3();
});

$("#no-button").click(function () {
    sendMessage("Vera's clicked no to the first question.");
    $("#are-you-sure").hide();
    $("#no-result").show();
});

$("#no-ready-button").click(function () {
    sendMessage("Vera's clicked no to the are you ready question.");
    $("#are-you-ready").hide();
    $("#no-result").show();
});

function processQuestion() {
    sendMessage("The question number " + viewModel.question.id() + " is shown.");
    $("#go").hide();
    $("#fail-message").hide();
    $("#timer-message").hide();
    enable();
    $("#question-partial").show();
    runTimer(viewModel.question.time());
}

function showChoices(message) {
    $("#question-partial").hide();
    $("#success-message").text(message);
    $("#success-message").show();
    setTimeout(function () {
        $("#success-message").hide();
        showChoicePartial();
    }, 3000);
}

function showChoicePartial() {
    sendMessage("The choices are shown.");
    $("#decision-partial").hide();
    $("#choice-partial").show();
}

function showFailMessage(message) {
    $("#fail-message").text(message);
    $("#fail-message").show();
}

function hideFailMessage() {
    $("#fail-message").hide();
}

function showRelaxMessage() {
    sendMessage("Relax message is shown.");
    $("#question-partial").hide();
    $("#relax-message").show();
    setTimeout(function () {
        $("#relax-message").hide();
        startTimer();
        showTimerMessage();
    }, 3000);
}

function showTimerMessage() {
    $("#timer-message").show();
}

var externalStopTimer;

function runTimer(secondsLeft) {
    sendMessage("Timer is started. The time left to answer: " + secondsLeft + " seconds.");
    $("#timer").text("The time left to answer: " + secondsLeft + "s");

    var timer = setInterval(function () {
        if (viewModel.status() == STATUSES.ANSWERED) {
            stopTimer();
        }
        $("#timer").text("The time left to answer: " + secondsLeft + "s");
        showQuestionTime(secondsLeft);
        if (secondsLeft == 0) {
            sendMessage("The time is over.");
            $("#timer").text("The time is over");
            stopTimer();
            disable();
            setTimeout(showRelaxMessage, 2000);
        }
        secondsLeft--;
        if (secondsLeft >= 0) {
            viewModel.question.time(secondsLeft);
            viewModel.setQuestionTime();
            showQuestionTime(secondsLeft);
        }
    }, 1000);

    function stopTimer() {
        sendMessage("Timer is stopped.");
        window.clearInterval(timer);
        showQuestionTime(0);
    }

    externalStopTimer = stopTimer;
}

function disable() {
    $("#answer-input").attr("disabled", true);
    $("#answer-button").attr("disabled", true);
}

function enable() {
    $("#answer-input").attr("disabled", false);
    $("#answer-button").attr("disabled", false);
}

function process3() {
    sendMessage("3.");
    $("#yes-result").hide();
    $("#3").show();
    setTimeout(process2, 1000);
}

function process2() {
    sendMessage("2.");
    $("#3").hide();
    $("#2").show();
    setTimeout(process1, 1000);
}

function process1() {
    sendMessage("1.");
    $("#2").hide();
    $("#1").show();
    setTimeout(processGo, 1000);
}

function processGo() {
    sendMessage("GO!");
    $("#1").hide();
    $("#go").show();
    setTimeout(processQuestion, 1000);
}

function noQuestions() {
    sendMessage("There are no questions anymore.");
    $("#timer-message").hide();
    $("#no-questions").show();
}

function processLink() {
    sendMessage("Decision partial is shown.");
    $("#choice-partial").hide();
    $("#decision-partial").show();
}

function goToFinish() {
    sendMessage("FINISH!");
    $("#decision-partial").hide();
    $("#after-decision").show();
}

function showFinished() {
    sendMessage("FINISH!");
    $("#finished").show();
}
