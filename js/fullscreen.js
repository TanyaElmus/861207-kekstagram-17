'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var social = bigPicture.querySelector('.big-picture__social');
  var commentTemplate = social.querySelector('.social__comment');
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

  var renderCart = function (images) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('img').src = images[0].url;
    social.querySelector('.likes-count').textContent = images[0].likes;
    social.querySelector('.comments-count').textContent = images[0].comments.length;
    // ------------------------------------------------
    createComment(images[0].comments);
    //  --------------------------------------------------------
    social.querySelector('.social__caption').textContent = images[0].description;
    social.querySelector('.social__comment-count').classList.add('hidden');
    social.querySelector('.comments-loader').classList.add('hidden');

    //  ----------------------------------------------
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
  window.load(renderCart, window.gallery.errorHandler);
})();
