var Dialog = (function () {
  var Dialog = function (option) {
    return Dialog.fn.init(option);
  }

  Dialog.fn = Dialog.prototype = {
    init: function (option) {
      this.dom = document.querySelector(option.el);
      this.bindEvent(option);
      return this;
    },
    bindEvent: function (option) {
      var self = this;
      document.querySelector('.dialog .sure').addEventListener('click', function (e) {
        self.hide();
        self.sure(e, option.sure);
      });
      document.querySelector('.dialog .cancel').addEventListener('click', function (e) {
        self.hide();
        self.cancel(e, option.cancel)
      })
    },
    show: function () {
      this.dom.classList.remove('hide');
      this.dom.classList.toggle('show');
      document.body.style.overflow = "hidden";
    },
    hide: function () {
      this.dom.classList.remove('show');
      this.dom.classList.toggle('hide')
      document.body.style.overflow = "scroll";
    },
    sure: function (e, a) {
      if (a) {
        a(e);
      }
    },
    cancel: function (e, b) {
      if (b) {
        b(e);
      }
    }
  }

  return Dialog;
})()