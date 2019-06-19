'use strict';
var PHOTO_COMMENTS = ['Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
var NAMES = ['Вася','Петя','Алина','Таня'];
var images = [];
var i = 0;
for (i = 0; i < 25; i++) {
images[i] = {
  url : 'photos/' + (i + 1) +'.jpg',
  likes : Math.floor(Math.random()*185)+16,
  comments  : {
    avatar: 'img/avatar-' + Math.floor(Math.random()*7) + '.svg',
    message: PHOTO_COMMENTS[Math.floor(Math.random()*7)],
    name: NAMES[Math.floor(Math.random()*4)]
  }

};
console.log(images[i])
}

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = textContent =images.url;
  pictureElement.querySelector('picture__likes').textContent = images.likes;
  pictureElement.querySelector('picture__comments').textContent = images.comments;
  return pictureElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < images.length; i++) {
  fragment.appendChild(renderPicture(images[i]));
}

pictureElement.appendChild(fragment);
