'use strict';

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

var generateNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

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
}

createFragment(getData());


// эффекты
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

var ESC_KEYCODE = 27;
var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = document.querySelector('.img-upload__cancel');
var effectLevelPin = document.querySelector('.effect-level__pin');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectLine = document.querySelector('.effect-level__line');
var effectsItem = document.querySelector('.effects');

// функция возвращающая строчку для эффекта css
var createEffect = function (lineValue, currentFilter) {
  return currentFilter.effect + '(' + currentFilter.maxvalue * lineValue + currentFilter.points + ')';
};

// переключалка между эффектами
effectsItem.addEventListener('change', function (evt) {
  var currentFilter = effects[evt.target.value];
  if (currentFilter) {
    imgUploadPreview.style.filter = createEffect(1, currentFilter);
  } else {
    imgUploadPreview.style.filter = null;
  }
});

// проверяет нажатие ESC
var checkEscape = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    imgUploadOverlay.classList.add('hidden');
  }
};

// открывает окно
uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', checkEscape);
});

// при нажатии на крестик закрывает окно
imgUploadCancel.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
  uploadFile = '';
});

// применяет эффект относительно положения ползунка
effectLevelPin.addEventListener('mouseup', function (evt) {
  var currentFilterInput = document.querySelector('.effects__radio:checked');
  var lineRect = effectLine.getBoundingClientRect();
  var sliderOffset = evt.clientX - lineRect.x;
  var lineValue = sliderOffset / lineRect.width;
  var currentFilter = effects[currentFilterInput.value];
  imgUploadPreview.style.filter = createEffect(lineValue, currentFilter);
});

// отключает закрытие окна при нажатии кнопки ESC при фокусе на поле ввода комментария
var textDescription = document.querySelector('.text__description');
textDescription.addEventListener('focus', function () {
  document.removeEventListener('keydown', checkEscape);
});
textDescription.addEventListener('blur', function () {
  document.addEventListener('keydown', checkEscape);
});
