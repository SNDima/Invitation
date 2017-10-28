function ViewModel(actions) {
    var self = this;

    self.actions = actions;

    self.question = {
        id: ko.observable(0),
        str: ko.observable(""),
        time: ko.observable(0),
    }

    self.status = ko.observable(STATUSES.INITIAL);

    self.init = function (start, noQuestions) {
        self.getQuestion(start, noQuestions);
    }

    self.getQuestion = function(start, noQuestions) {
        $.get(self.actions.GetQuestion)
            .done(function (res) {
                if (res.Id != 0) {
                    self.question.id(res.Id);
                    self.question.str(res.Str);
                    self.question.time(res.TimeToAnswer);
                    self.getStatus(start);
                } else {
                    noQuestions();
                }
            });
    };

    self.getStatus = function(start) {
        $.get(self.actions.GetStatus)
            .done(function (res) {
                self.status(res.Status);
                if (start) {
                    start();
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
}