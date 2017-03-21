$('document').ready(function () {
  "use strict";

  var textArea = $('.new-tweet form textarea');
  textArea.on('keyup', function (e) {
    var inputLength = $(this).val().length;
    var characterLeft = 140 - inputLength;
    var counter = textArea.parent().find('.counter')[0];
    if (characterLeft < 0) {
      $(counter).addClass('invalid');
    } else {
      $(counter).removeClass('invalid');
    }
    counter.innerHTML = characterLeft;
  })
});