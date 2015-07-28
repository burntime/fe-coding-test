var MYAPP = MYAPP || {};

MYAPP.validate = {
  initzialize: function(form, url) {
    this.registrationForm = $(form);
    this.validateUrl = url;

    this._observe();
  },

  _observe: function() {
    this.registrationForm.on("focusout", "input, select", this._validate.bind(this));
  },

  _validate: function(event) {
    var target = event.currentTarget,
        data   = {};

    if (target.type === "password") {
      return;
    }

    data[target.name] = target.value;

    $.ajax({
      url: this.validateUrl,
      data: data
    }).success(function(response) {
      var element = $(target);

      if (response.valid === false) {
        element.addClass("error");
      } else {
        element.removeClass("error");
      }
    });
  }
};
