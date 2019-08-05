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

  //  создание комментария
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
    // eslint-disable-next-line no-console
    console.log(social.querySelector('.social__comment-count').childNodes[0]);
    social.querySelector('.social__comment-count').childNodes[0].nodeValue = commentsNumber + ' из ';
  };

  // слушатель нажатия на картинку и получение ее номера и показ окна для полноэкранного просмотра

  // var pictures = document.querySelector('.pictures');
  // pictures.addEventListener('click', function (evt) {
  //   var currentImageAdress = evt.target.src.slice(-6, -1);
  //   var currentImageNumber = Number(currentImageAdress.replace(/\D+/g, ''));
  //   window.load(renderCart, window.gallery.errorHandler);
  //
  //   index = currentImageNumber;
  // });

  //  вывод текстовых данных(лайков, количества комментариев, описания, картинки
  var renderCart = function (image) {
    bigPicture.querySelector('img').src = image.url;
    social.querySelector('.likes-count').textContent = image.likes;
    social.querySelector('.comments-count').textContent = image.comments.length;
    //  createComment(images[index - 1].comments);
    var showMoreButton = social.querySelector('.comments-loader');
    var firstVisibleCommentIndex = 0;
    // var lastVisibleCommentIndex = (images[index - 1].comments.length >= 5) ? 4 : (images[index - 1].comments.length - 1);
    if (image.comments.length > 4) {
      var lastVisibleCommentIndex = 4;
    } else {
      lastVisibleCommentIndex = image.comments.length - 1;
    }
    createComment(image.comments.slice(firstVisibleCommentIndex, lastVisibleCommentIndex + 1), (lastVisibleCommentIndex + 1));
    if (image.comments.length <= 5) {
      social.querySelector('.comments-loader').classList.add('hidden');
    } else {
      showMoreButton.addEventListener('click', function () {
        // var allComments = document.querySelectorAll('.social__comment');
        // allComments.forEach(function (item) {
        //   item.remove();
        // });
      });
      var moreComments = ((image.comments.length - (lastVisibleCommentIndex + 1)) >= 5) ? 5 : (image.comments.length - (lastVisibleCommentIndex + 1));

      createComment(image.comments.slice(firstVisibleCommentIndex, lastVisibleCommentIndex += moreComments, lastVisibleCommentIndex + 1));
    }
    //   if (lastCommentIndex >= images[index - 1].comments.length - 1) {
    //     social.querySelector('.comments-loader').remove('hidden');
    //   }
    // });
    // social.querySelector('.social__caption').textContent = images[index - 1].description;
    // social.querySelector('.social__comment-count').classList.add('hidden');
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
    bigPicture.classList.remove('hidden');
  };
  window.fullscreen = {
    renderCart: renderCart
  };
})();
