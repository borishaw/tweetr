$('document').ready(function () {
  "use strict";

  let $textArea = $('.new-tweet form textarea');
  $textArea.on('keyup', function (e) {
    let inputLength = $(this).val().length;
    let characterLeft = 140 - inputLength;
    let $counter = $textArea.parent().find('.counter');
    if (characterLeft < 0) {
      $counter.addClass('invalid');
    } else {
      $counter.removeClass('invalid');
    }
    $counter.text(characterLeft);
  })
});