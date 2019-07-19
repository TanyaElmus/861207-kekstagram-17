'use strict';

(function () {
  // переменные  для данных миниатюр
  var pictureWrapper = document.querySelector('.pictures');
  var PHOTO_COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES = ['Лера', 'Артем', 'Максим', 'Таня'];
  var NUMBER_OF_PICTURE = 25;

  // переменные для формы редактирования фотографии и применения эффектов
  var ESC_KEYCODE = 27;
  var effectLineDepth = document.querySelector('.effect-level__depth');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectLine = document.querySelector('.effect-level__line');
  var effectsItem = document.querySelector('.effects');
  var textDescription = document.querySelector('.text__description');

  // массив css-эффектов
  var effects = {
    heat: {
      effect: 'brightness',
      maxvalue: 3,
      minvalue: 1,
      points: ''
    },
    chrome: {
      effect: 'grayscale',
      maxvalue: 1,
      minvalue: 0,
      points: ''
    },
    sepia: {
      effect: 'sepia',
      maxvalue: 1,
      minvalue: 0,
      points: ''
    },
    marvin: {
      effect: 'invert',
      maxvalue: 100,
      minvalue: 0,
      points: '%'
    },
    phobos: {
      effect: 'blur',
      maxvalue: 3,
      minvalue: 1,
      points: 'px'
    },
    none: null
  };

  // генерация случайных чисел
  var generateNumber = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  // функция загружающая лайки и комменты
  var getData = function () {
    var images = [];

    for (var i = 0; i < NUMBER_OF_PICTURE; i++) {
      images[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: generateNumber(15, 200),
        comments: []
      };

      for (var j = 0; j < generateNumber(0, 1); j++) {
        images[i].comments.push({
          avatar: 'img/avatar-' + generateNumber(1, 6) + '.svg',
          message: PHOTO_COMMENTS[generateNumber(0, 5)],
          name: NAMES[generateNumber(0, 3)]
        });
      }
    }
    return images;
  };

  window.data = {
    pictureWrapper: pictureWrapper,
    NAMES: NAMES,
    PHOTO_COMMENTS: PHOTO_COMMENTS,
    NUMBER_OF_PICTURE: NUMBER_OF_PICTURE,
    generateNumber: generateNumber,
    getData: getData,
    ESC_KEYCODE: ESC_KEYCODE,
    effectLineDepth: effectLineDepth,
    uploadFile: uploadFile,
    imgUploadOverlay: imgUploadOverlay,
    imgUploadCancel: imgUploadCancel,
    effectLevelPin: effectLevelPin,
    imgUploadPreview: imgUploadPreview,
    effectLine: effectLine,
    effectsItem: effectsItem,
    textDescription: textDescription,
    effects: effects
  };
})();
