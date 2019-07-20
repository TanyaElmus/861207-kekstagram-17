'use strict';
(function () {
  // функция возвращающая строчку для эффекта css
  var createEffect = function (lineValue, currentFilter) {
    return currentFilter.effect + '(' + currentFilter.maxvalue * lineValue + currentFilter.points + ')';
  };

  // переключалка между эффектами
  window.data.effectsItem.addEventListener('change', function (evt) {
    var currentFilter = window.data.effects[evt.target.value];
    if (currentFilter) {
      window.data.imgUploadPreview.style.filter = createEffect(1, currentFilter);
    } else {
      window.data.imgUploadPreview.style.filter = null;
    }
  });

  // перемещение ползунка
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
})();
