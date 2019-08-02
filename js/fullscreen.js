'use strict';

(function () {
  var generateNumber = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  var renderCart = function (images) {
    var bigPicture = document.querySelector('.big-picture');
    var social = bigPicture.querySelector('.big-picture__social');
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('img').src = images[0].url;
    social.querySelector('.likes-count').textContent = images[0].likes;
    social.querySelector('.comments-count').textContent = images[0].comments.length;
    // ------------------------------------------------

    //  var comments = social.querySelectorAll('.social__comments');
    var commentTemplate = social.querySelector('.social__comment').querySelector('.social__comment');
    var renderComment = function () {
      var commentElement = commentTemplate.cloneNode(true);

      commentElement.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(1, 6) + '.svg';

      return commentElement;
    };
    var createComment = function (comments) {
      var allComments = document.querySelectorAll('.social__comment');
      allComments.forEach(function (item) {
        item.remove();
      });
      var comment = comments.createDocumentFragment();
      images[0].comments.forEach(function (item) {

        comment.appendChild(renderComment(item));
        item.querySelector('.social__comment').textContent = images[0].comments[0].message;
      });
      social.querySelector('.social__comments').appendChild(comment);
    };
    createComment(images[0].comments);

    //  --------------------------------------------------------
    social.querySelector('.social__caption').textContent = images[0].description;
    social.querySelector('.social__comment-count').classList.add('hidden');
    console.log(social.querySelector('.comments-loader'));
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
