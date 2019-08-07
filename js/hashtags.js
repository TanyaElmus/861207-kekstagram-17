'use strict';

(function () {

  var buttonUpload = document.querySelector('.img-upload__submit');
  var inputHashTags = document.querySelector('.text__hashtags');
  // var inputComments = document.querySelector('.text__description');
  buttonUpload.addEventListener('click', function () {
    window.data.hashtagField.setCustomValidity('');
    // eslint-disable-next-line no-unused-vars
    // var commentsForUpload = inputComments.value.trim();
    var hashtags = inputHashTags.value.toLowerCase().split(' ');
    var similiar = hashtags.some(function (item, index, array) {
      return array.indexOf(item) !== index;
    });
    if (hashtags.length > 5) {
      window.data.hashtagField.setCustomValidity('Количество хэш-тегов не должно быть больше пяти');
    }
    hashtags.forEach(function (item) {
      if (item.charAt(0) !== '#' && inputHashTags.value !== '') {
        window.data.hashtagField.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');

      } else if (item.length > 20) {
        window.data.hashtagField.setCustomValidity('Максимальная длина одного хэш-тега не должна превышать 20 символов, включая решётку');
      } else if (item.length === 1 && item === '#') {
        window.data.hashtagField.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      } else if (similiar) {
        window.data.hashtagField.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды. #ХэшТег и #хэштег считаются одним и тем же тегом');
      }
    });
  });


})();
