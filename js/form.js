'use strict';
(function () {
  // проверяет нажатие ESC
  var checkEscape = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      window.data.imgUploadOverlay.classList.add('hidden');
    }
  };

  // открывает окно
  window.data.uploadFile.addEventListener('change', function () {
    window.data.imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', checkEscape);
  });

  // при нажатии на крестик закрывает окно
  window.data.imgUploadCancel.addEventListener('click', function () {
    window.data.imgUploadOverlay.classList.add('hidden');
    window.data.uploadFile = '';
  });

  // отключает закрытие окна при нажатии кнопки ESC при фокусе на поле ввода комментария
  window.data.textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', checkEscape);
  });
  window.data.textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', checkEscape);
  });
})();
