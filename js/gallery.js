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

  var createFragment = function (images) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < images.length; i++) {
      fragment.appendChild(renderPicture(images[i]));
    }

    window.data.pictureWrapper.appendChild(fragment);
  };

  // createFragment(window.data.getData());


  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(createFragment, errorHandler);
})();
