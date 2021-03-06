﻿function ViewModel(actions) {
    var self = this;

    self.actions = actions;

    self.question = {
        id: ko.observable(0),
        str: ko.observable(""),
        time: ko.observable(0),
        answer: ko.observable("")
    }

    self.status = ko.observable(STATUSES.INITIAL);

    self.currentTab = ko.observable("kinosmena");
    self.currentBottomTab = ko.observable("photos");

    self.isOnDecisionPage = ko.observable(false);

    self.init = function (start, noQuestions) {
        self.getStatus(start, noQuestions);
    }

    self.getQuestion = function(start, noQuestions) {
        $.get(self.actions.GetQuestion)
            .done(function (res) {
                if (res.Id != 0) {
                    self.question.id(res.Id);
                    self.question.str(res.Str);
                    self.question.time(res.TimeToAnswer);
                    start();
                } else {
                    noQuestions();
                }
            });
    };

    self.updateQuestion = function (noQuestions) {
        $.get(self.actions.GetQuestion)
            .done(function (res) {
                if (res.Id != 0) {
                    self.question.id(res.Id);
                    self.question.str(res.Str);
                    self.question.time(res.TimeToAnswer);
                    processQuestion();
                } else {
                    noQuestions();
                }
            });
    };

    self.getStatus = function (start, noQuestions) {
        $.get(self.actions.GetStatus)
            .done(function (res) {
                self.status(res.Status);
                if (self.status() == STATUSES.ANSWERED || self.status() == STATUSES.AFTER_DECISION) {
                    start();
                } else {
                    self.getQuestion(start, noQuestions)
                }
            });
    };

    self.setStatus = function(status) {
        $.post(self.actions.SetStatus, {status: status})
            .done(function(res) {
                self.status(status);
            });
    }

    self.setQuestionTime = function () {
        $.post(self.actions.SetQuestionTime,
            {
                id: self.question.id(),
                time: self.question.time()
            });
    }

    self.answerQuestionExecuter = function() {
        self.answerQuestion(showChoices, showFailMessage);
    }

    self.answerQuestion = function (success, fail) {
        sendMessage("Try to answer the question number " + self.question.id()
            + ". The given answer is " + self.question.answer() + ".");
        if (self.question.time() > 0) {
            $.post(self.actions.AnswerQuestion,
            {
                id: self.question.id(),
                answer: self.question.answer()
            })
            .done(function (res) {
                if (res.Succeeded) {
                    externalStopTimer();
                    sendMessage("The question is successfully answered.");
                    self.status(STATUSES.ANSWERED);
                    success(res.Message)
                } else {
                    sendMessage("Wrong answer.");
                    fail(res.Message)
                }
            });
        }
    }

    self.makeDecision = function (decision) {
        sendMessage("The decision is made and it is " + decision + ".");
        self.sendSms("The dicision is " + decision + ".");
        $.post(self.actions.MakeDecision,
            {
                decision: decision
            })
            .done(function(res) {
                self.status(STATUSES.AFTER_DECISION)
                goToFinish();
            });
    }

    self.sendSms = function (message) {
        $.post(self.actions.SendSms, {message: message});
    };

    self.onEnter = function (d, e) {
        hideFailMessage();
        if (e.keyCode === 13) {
            self.answerQuestionExecuter();
        };
        return true;
    };

    self.selectMovie = function (next) {
        if (self.currentTab() != next) {
            sendMessage("Next moview is selected: " + next + ".");
            $("#" + self.currentTab() + "-li").removeClass("active");
            $("#" + next + "-li").addClass("active");
            self.currentTab(next);
        }
    }

    self.selectBottomTab = function (tab) {
        if (self.currentBottomTab() != tab) {
            sendMessage(tab + " tab is selected.");
            $("#" + self.currentBottomTab() + "-a").removeClass("bottom-active");
            $("#" + tab + "-a").addClass("bottom-active");
            self.currentBottomTab(tab);
        }
    }

    self.useLink = function () {
        self.isOnDecisionPage(true);
        sendMessage("Went to the decision page.");
        processLink();
    }

    self.useAnotherLink = function () {
        self.isOnDecisionPage(false);
        sendMessage("Went back to the choices page.");
        showChoicePartial();
    }
}