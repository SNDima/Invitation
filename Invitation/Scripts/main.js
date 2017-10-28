function start() {
    if (viewModel.status() == STATUSES.INITIAL) {
        $("#hello").show();
        setTimeout(showFirstQuestion, 2000);
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
}

function showFirstQuestion() {
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
    viewModel.setStatus(STATUSES.YES_SELECTED);
    $("#are-you-sure").hide();
    $("#yes-result").show();
    setTimeout(process3, 3000);
});

$("#yes-ready-button").click(function () {
    viewModel.setStatus(STATUSES.YES_SELECTED);
    $("#are-you-ready").hide();
    process3();
});

$("#no-button").click(function () {
    $("#are-you-sure").hide();
    $("#no-result").show();
});

$("#no-ready-button").click(function () {
    $("#are-you-ready").hide();
    $("#no-result").show();
});

function processQuestion() {
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
    viewModel.selectMovie("kinosmena");
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

function runTimer(secondsLeft) {
    $("#timer").text("The time left to answer: " + secondsLeft + "s");

    var timer = setInterval(function () {
        if (viewModel.status() == STATUSES.ANSWERED) {
            stopTimer();
        }
        $("#timer").text("The time left to answer: " + secondsLeft + "s");
        if (secondsLeft == 0) {
            $("#timer").text("The time is over");
            stopTimer();
            disable();
            setTimeout(showRelaxMessage, 2000);
        }
        secondsLeft--;
        if (secondsLeft >= 0) {
            viewModel.question.time(secondsLeft);
            viewModel.setQuestionTime();
        }
    }, 1000);

    function stopTimer() {
        window.clearInterval(timer)
    }
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
    $("#yes-result").hide();
    $("#3").show();
    setTimeout(process2, 1000);
}

function process2() {
    $("#3").hide();
    $("#2").show();
    setTimeout(process1, 1000);
}

function process1() {
    $("#2").hide();
    $("#1").show();
    setTimeout(processGo, 1000);
}

function processGo() {
    $("#1").hide();
    $("#go").show();
    setTimeout(processQuestion, 1000);
}

function noQuestions() {
    $("#timer-message").hide();
    $("#no-questions").show();
}
