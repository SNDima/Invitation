function ViewModel(actions) {
    var self = this;

    self.actions = actions;

    self.question = {
        str: ko.observable(""),
        time: ko.observable(0),
    }

    self.getQuestion = function () {
        $.get(self.actions.GetQuestion)
            .done(function (res) {
                self.question.str(res.Str);
                self.question.time(res.TimeToAnswer);
                $("#question-partial").show();
                runTimer(self.question.time());
            });
    };
}