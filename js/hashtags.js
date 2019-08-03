'use strict';

// window.data.imgUploadOverlay
(function () {
  //  var hashtagField = document.querySelector('.text__hashtags');


  window.data.hashtagField.addEventListener('input', function (evt) {
    var target = evt.target;
    var hashtags = target.value.split(' ');
    console.log(hashtags);
    if (hashtags.length > 5) {
      target.setCustomValidity('Количество хэш-тегов не должно быть больше пяти');
      console.log(hashtags.length);
    }
    hashtags.forEach(function (item) {
      if (item[0] !== '#') {
        target.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
      } else if (item.length > 20) {
        target.setCustomValidity('Максимальная длина одного хэш-тега не должна превышать 20 символов, включая решётку');
      } else if (item.length === 1 && item === '#') {
        //  target.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      } else {
        hashtags.forEach(function (checkedItem) {
          if (item.toLowerCase() === checkedItem.toLowerCase()) {
            if (item.indexOf() === checkedItem.indexOf()) {
              console.log('ded');
            } else {
              target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды. #ХэшТег и #хэштег считаются одним и тем же тегом');
            }
          }
        });
      }
    });
  });


})();
