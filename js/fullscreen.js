'use strict';

(function () {
  var index;
  var bigPicture = document.querySelector('.big-picture');
  var social = bigPicture.querySelector('.big-picture__social');
  var commentTemplate = social.querySelector('.social__comment');

  // вывод комментария
  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    var picture = commentElement.querySelector('.social__picture');
    picture.src = comment.avatar;
    picture.alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  var createComment = function (comments) {
    var comment = document.createDocumentFragment();
    comments.forEach(function (item) {
      comment.appendChild(renderComment(item));
    });
    var allComments = document.querySelectorAll('.social__comment');
    allComments.forEach(function (item) {
      item.remove();
    });
    social.querySelector('.social__comments').appendChild(comment);
  };

  // слушатель нажатия на картинку и получение ее номера и показ окна для полноэкранного просмотра
  var pictures = document.querySelector('.pictures');
  pictures.addEventListener('click', function (evt) {
    var currentImageAdress = evt.target.src.slice(-6, -1);
    var currentImageNumber = Number(currentImageAdress.replace(/\D+/g, ''));
    window.load(renderCart, window.gallery.errorHandler);
    bigPicture.classList.remove('hidden');
    index = currentImageNumber;
  });

  //  вывод текстовых данных(лайков, количества комментариев, описания) картинки
  var renderCart = function (images) {
    bigPicture.querySelector('img').src = images[index - 1].url;
    social.querySelector('.likes-count').textContent = images[index - 1].likes;
    social.querySelector('.comments-count').textContent = images[index - 1].comments.length;
    createComment(images[index - 1].comments);
    social.querySelector('.social__caption').textContent = images[index - 1].description;
    social.querySelector('.social__comment-count').classList.add('hidden');
    // social.querySelector('.comments-loader').classList.add('hidden');

    var cancelButton = bigPicture.querySelector('#picture-cancel');
    var overlay = document.querySelector('.overlay');
    cancelButton.addEventListener('click', function () {
      overlay.classList.add('hidden');
    });
    var checkEscape = function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        overlay.classList.add('hidden');
      }
    };
    document.addEventListener('keydown', checkEscape);
  };
})();
