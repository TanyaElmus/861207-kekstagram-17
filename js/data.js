'use strict';

(function () {
  // переменные  для данных миниатюр
  var pictureWrapper = document.querySelector('.pictures');

  // переменные для формы редактирования фотографии и применения эффектов
  var SUCCESS_CODE = 200;
  var ESC_KEYCODE = 27;
  var effectLineDepth = document.querySelector('.effect-level__depth');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectLine = document.querySelector('.effect-level__line');
  var effectsItem = document.querySelector('.effects');
  var hashtagField = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var imgFilters = document.querySelector('.img-filters');
  var imagesCopy = [];
  var imgUploadForm = document.querySelector('.img-upload__form');
  var mainElement = document.querySelector('main');
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

  window.data = {
    pictureWrapper: pictureWrapper,
    SUCCESS_CODE: SUCCESS_CODE,
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
    effects: effects,
    imgFilters: imgFilters,
    imagesCopy: imagesCopy,
    hashtagField: hashtagField,
    imgUploadForm: imgUploadForm,
    mainElement: mainElement
  };
})();
