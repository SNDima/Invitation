function AdminViewModel(actions) {
    var self = this;

    self.actions = actions;

    self.flush = function () {
        $.get(self.actions.Flush)
            .done(function (res) {
                alert("Configuration is returned to start.");
            });
    };

    self.enablePhone = function () {
        $.get(self.actions.EnablePhone)
            .done(function (res) {
                alert("The phone is successfully enabled.");
            });
    };

    self.disablePhone = function () {
        $.get(self.actions.DisablePhone)
            .done(function (res) {
                alert("The phone is successfully disabled.");
            });
    };

    self.getPhoneStatus = function () {
        $.get(self.actions.IsPhoneEnabled)
            .done(function (res) {
                if (res.IsPhoneEnabled) {
                    alert("The phone is on now.");
                } else {
                    alert("The phone is off now.");
                }
            });
    };
}