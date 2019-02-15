"use strict";

(function () {

  var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

  var pins = document.querySelector('.map__pins');

  window.createPin = function(x, y, src, alt) {
    var pin = document.createElement('button');
    pin.type = 'button';
    pin.classList.add('map__pin');
    pin.style.left = ''+x+'px';
    pin.style.top = ''+y+'px';
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.width = 45;
    img.height = 45;
    pin.appendChild(img);
    pins.appendChild(pin);
  };

})();
