'use strict';

(function () {

  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var MAX_OFFSET = 453;

  var createEffect = function (lineValue, currentFilter) {

    return currentFilter.effect + '(' + currentFilter.maxvalue * lineValue + currentFilter.points + ')';
  };

  window.data.effectsItem.addEventListener('change', function (evt) {
    var currentFilter = window.data.effects[evt.target.value];
    if (currentFilter) {
      window.data.effectControl.classList.remove('hidden');
      window.data.imgUploadPreview.style.filter = createEffect(1, currentFilter);
      window.data.effectLevelPin.style.left = MAX_OFFSET + 'px';
      window.data.effectLineDepth.style.width = MAX_OFFSET + 'px';
    } else {
      window.data.imgUploadPreview.style.filter = null;
      window.data.effectControl.classList.add('hidden');
    }
  });

  window.data.effectLevelPin.addEventListener('mousedown', function (evt) {
    var lineRect = window.data.effectLine.getBoundingClientRect();
    var currentFilterInput = document.querySelector('.effects__radio:checked');
    evt.preventDefault();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var offset = moveEvt.clientX - lineRect.x;
      offset = Math.max(0, Math.min(offset, lineRect.width));
      window.data.effectLevelPin.style.left = offset + 'px';
      window.data.effectLineDepth.style.width = offset + 'px';

      var sliderOffset = moveEvt.clientX - lineRect.x;
      var lineValue = sliderOffset / lineRect.width;
      var currentFilter = window.data.effects[currentFilterInput.value];
      window.data.imgUploadPreview.style.filter = createEffect(lineValue, currentFilter);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var changeScale = function () {
    var img = window.data.imgUploadPreview.querySelector('img');
    var scaleSmallerButton = document.querySelector('.scale__control--smaller');
    var scaleBiggerButton = document.querySelector('.scale__control--bigger');
    var scaleValue = document.querySelector('.scale__control--value');
    scaleSmallerButton.addEventListener('click', function () {
      var value = Number(scaleValue.value.slice(0, -1));
      value -= 25;
      if (value < MIN_SCALE) {
        value = MIN_SCALE;
      }
      scaleValue.value = value + '%';
      img.style = 'transform: scale(' + value / 100 + ')';
    });
    scaleBiggerButton.addEventListener('click', function () {
      var value = Number(scaleValue.value.slice(0, -1));
      value += 25;
      if (value > MAX_SCALE) {
        value = MAX_SCALE;
      }
      scaleValue.value = value + '%';
      img.style = 'transform: scale(' + value / 100 + ')';
    });
  };
  changeScale();
})();
