'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.data.SUCCESS_CODE) {
        onSuccess(xhr.response);
        // console.log(window.data.imgFiltersContainer);
        window.data.imgFiltersContainer.classList.remove('hidden');
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL_LOAD);
    xhr.send();

  };

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.data.SUCCESS_CODE) {
        onSuccess(xhr.response);
        window.openServiceMessage('success');
        window.data.imgUploadForm.reset();
      } else {
        window.data.imgUploadForm.classList.add('hidden');
        window.openServiceMessage('error');
      }
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

})();
