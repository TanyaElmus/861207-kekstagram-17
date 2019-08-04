'use strict';
// переименовать этот модуль и экспортировать  ему два метода load save
// 1. 3 параметра ддля save onSuccess, onError и данные
// 2. данные при вызове генерировать при помощи FormData
// 3. передать ее в send
// 4. после создания save повесить на форму слушатель событий submit
// 5. внутри обработчика вызвать preventdefult
// 6. вызвать функцию save
// 7. передать в нее две функции при onSuccess, onError

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  // var mainElement = document.querySelector('main');
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.data.SUCCESS_CODE) {
        onSuccess(xhr.response);
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

    xhr.open('GET', URL);
    xhr.send();

  };

  var URLs = 'https://js.dump.academy/kekstagram';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.data.SUCCESS_CODE) {
        onSuccess(xhr.response);
        // var successTemplate = document.querySelector('#success')
        //   .content
        //   .querySelector('.success');
        // var renderSuccess = function () {
        //   var successElement = successTemplate.cloneNode(true);
        //   return successElement;
        // };
        // var success = document.createDocumentFragment();
        // success.appendChild(renderSuccess());
        // mainElement.appendChild(success);
        window.openServiceMessage('success');
        window.data.imgUploadForm.reset();
      } else {
        // onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        window.data.imgUploadForm.classList.add('hidden');
        window.openServiceMessage('error');
        // document.querySelector('.success').remove('hidden');
      }
    });

    xhr.open('POST', URLs);
    xhr.send(data);
  };


})();
