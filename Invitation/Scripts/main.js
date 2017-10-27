$(function () {
    setTimeout(showFirstQuestion, 2000);
});

function showFirstQuestion() {
    $("#hello").hide();
    $("#are-you-sure").show();
}

$("#yes-button").click(function () {
    $("#are-you-sure").hide();
    $("#yes-result").show();
    setTimeout(process3, 3000);
});

$("#no-button").click(function () {
    $("#are-you-sure").hide();
    $("#no-result").show();
});

function processQuestion() {
    $("#go").hide();
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