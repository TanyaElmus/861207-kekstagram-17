'use strict';

(function () {

  var checkEscape = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      window.data.imgUploadOverlay.classList.add('hidden');
      window.data.uploadSelectImage.reset();
      document.removeEventListener('keydown', checkEscape);

    }
  };
  window.data.imgFiltersContainer.classList.add('hidden');
  window.data.uploadFile.addEventListener('change', function () {
    window.data.imgUploadOverlay.classList.remove('hidden');
    window.data.effectControl.classList.add('hidden');
    document.addEventListener('keydown', checkEscape);
  });

  window.data.imgUploadCancel.addEventListener('click', function () {
    window.data.imgUploadOverlay.classList.add('hidden');
    window.data.uploadFile = '';
  });

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
    window.upload(new FormData(form), function (_response) {
      window.data.imgUploadOverlay.classList.add('hidden');
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
