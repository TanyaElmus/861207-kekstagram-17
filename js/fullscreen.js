'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var social = bigPicture.querySelector('.big-picture__social');
  var showMoreButton = social.querySelector('.comments-loader');
  var commentTemplate = social.querySelector('.social__comment');

  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    var picture = commentElement.querySelector('.social__picture');
    picture.src = comment.avatar;
    picture.alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  var createComment = function (comments, commentsNumber) {
    var comment = document.createDocumentFragment();
    comments.forEach(function (item) {
      comment.appendChild(renderComment(item));
    });
    var allComments = document.querySelectorAll('.social__comment');
    allComments.forEach(function (item) {
      item.remove();
    });
    social.querySelector('.social__comments').appendChild(comment);

    social.querySelector('.social__comment-count').childNodes[0].nodeValue = commentsNumber + ' из ';
  };

  var loadComments = function (comments) {
    var commentsCount = 0;
    return function () {
      commentsCount += 5;
      commentsCount = Math.min(commentsCount, comments.length);
      if (commentsCount === comments.length) {
        showMoreButton.classList.add('hidden');
      }
      createComment(comments.slice(0, commentsCount), commentsCount);
    };
  };

  var renderCart = function (image) {
    bigPicture.querySelector('img').src = image.url;
    social.querySelector('.likes-count').textContent = image.likes;
    social.querySelector('.comments-count').textContent = image.comments.length;
    showMoreButton.classList.remove('hidden');
    var showMoreComments = loadComments(image.comments);
    showMoreComments();
    showMoreButton.addEventListener('click', function () {
      showMoreComments();
    });

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
    bigPicture.classList.remove('hidden');
  };
  window.fullscreen = {
    renderCart: renderCart
  };
})();
