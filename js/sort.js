'use strict';

(function () {

  var popular = document.querySelector('#filter-popular');
  var imgNew = document.querySelector('#filter-new');
  var discussed = document.querySelector('#filter-discussed');
  var shuffle = function (arr) {
    var n = arr.length;
    while (n--) {
      var i = Math.floor(n * Math.random());
      var tmp = arr[i];
      arr[i] = arr[n];
      arr[n] = tmp;
    }
    return arr;
  };

  popular.addEventListener('click', window.debounce(function () {
    window.gallery.createFragment(window.gallery.imagesCopy);
  }));

  discussed.addEventListener('click', window.debounce(function () {
    var imagesCopySorted = window.gallery.imagesCopy.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    window.gallery.createFragment(imagesCopySorted);
  }));

  imgNew.addEventListener('click', window.debounce(function () {
    var imagesCopySorted = shuffle(window.gallery.imagesCopy).slice(0, 10);
    window.gallery.createFragment(imagesCopySorted);
  }));

  // window.data.effectsItem.querySelector('.button').addEventListener('change', function (evt) {
  //   console.log(window.data.imgFiltersContainer);
  // });
})();
