function ViewModel(actions) {
    var self = this;

    self.actions = actions;

    self.question = {
        str: ko.observable(""),
        time: ko.observable(0),
    }

    self.status = ko.observable(STATUSES.INITIAL);

    self.init = function (start) {
        self.getStatus(start);
    }

    self.getQuestion = function() {
        $.get(self.actions.GetQuestion)
            .done(function(res) {
                self.question.str(res.Str);
                self.question.time(res.TimeToAnswer);
                $("#question-partial").show();
                runTimer(self.question.time());
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
}