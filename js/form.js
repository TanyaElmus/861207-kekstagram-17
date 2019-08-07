'use strict';

(function () {

  // проверяет нажатие ESC
  var checkEscape = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      window.data.imgUploadOverlay.classList.add('hidden');
      window.data.uploadSelectImage.reset();
      document.removeEventListener('keydown', checkEscape);

    }
  };
  window.data.imgFiltersContainer.classList.add('hidden');
  // открывает окно
  window.data.uploadFile.addEventListener('change', function () {
    window.data.imgUploadOverlay.classList.remove('hidden');
    window.data.effectControl.classList.add('hidden');
    document.addEventListener('keydown', checkEscape);
  });

  // при нажатии на крестик закрывает окно
  window.data.imgUploadCancel.addEventListener('click', function () {
    window.data.imgUploadOverlay.classList.add('hidden');
    window.data.uploadFile = '';
  });

  // отключает закрытие окна при нажатии кнопки ESC при фокусе на поле ввода комментария и хэштэгов
  window.data.textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', checkEscape);
  });
  window.data.textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', checkEscape);
  });
  window.data.hashtagField.addEventListener('focus', function () {
    document.removeEventListener('keydown', checkEscape);
  });
  window.data.hashtagField.addEventListener('blur', function () {
    document.addEventListener('keydown', checkEscape);
  });

  var form = window.data.imgUploadForm;
  form.addEventListener('submit', function (evt) {
    // eslint-disable-next-line no-unused-vars
    window.upload(new FormData(form), function (response) {
      window.data.imgUploadForm.classList.add('hidden');
    });
    evt.preventDefault();
  });

  window.openServiceMessage = function (item) {
    var successTemplate = document.querySelector('#' + item)
      .content
      .querySelector('.' + item);
    var renderSuccess = function () {
      var successElement = successTemplate.cloneNode(true);
      return successElement;
    };
    var success = document.createDocumentFragment();
    success.appendChild(renderSuccess());
    window.data.mainElement.appendChild(success);
    var successButton = document.querySelector('.' + item + '__button');
    successButton.addEventListener('click', function () {
      document.querySelector('.' + item).remove('hidden');
    });
    var checkEscapeService = function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        window.data.mainElement.querySelector('.' + item).remove('hidden');
      }
      document.removeEventListener('keydown', checkEscapeService);
    };
    document.addEventListener('keydown', checkEscapeService);
    document.addEventListener('click', function () {
      window.data.mainElement.querySelector('.' + item).remove('hidden');
    });
  };
})();
