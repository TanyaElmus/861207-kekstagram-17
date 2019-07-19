'use strict';

// вывод картинок, комеентарие и лайков
(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    return pictureElement;
  };

  function createFragment(images) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < images.length; i++) {
      fragment.appendChild(renderPicture(images[i]));
    }

    window.data.pictureWrapper.appendChild(fragment);
  }

  createFragment(window.data.getData());
})();
