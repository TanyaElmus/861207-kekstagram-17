'use strict';

var pictureWrapper = document.querySelector('.pictures');
var PHOTO_COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Вася', 'Петя', 'Алина', 'Таня'];
var NUMBER_OF_PICTURE = 25;

var generateNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getData = function (images) {
    var images = [];

    for (var i = 0; i < NUMBER_OF_PICTURE; i++) {
      images[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: generateNumber (max, min),
        comments: []
      };

      for (var j = 0; j < generateNumber(0,2); j++) {
        images[i].comments.push({
          avatar: 'img/avatar-' + generateNumber(0, 7) + '.svg',
          message: PHOTO_COMMENTS[generateNumber(0, 7)],
          name: NAMES[generateNumber(0,4)]
        });
        return images;
      };
    }

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

      pictureWrapper.appendChild(fragment);

    };
    createFragment(images);
