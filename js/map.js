(function () {

  "use strict";

  const map = document.querySelector('.map');
  window.titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
  window.types = ['house', 'palase', 'flat', 'bungalo'];

  let count = 0;

  map.classList.remove('map--faded');

  window.getUserImg = function() {
    count++;
    return 'img/avatars/user0' + count + '.png';
  };

  window.getPinTitle = function(titles, callback) {
    let randomNum = getRandomNum(titles.length - 1, 0);
    let randomTitle = titles[randomNum];
    window.titles.splice(randomNum, 1);
    return randomTitle;
  };

  window.getRandomNum = function(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  window.getType = function(types) {
    return types[getRandomNum(types.length, 0)];
  }

  let pins = [

    pin = {
      "author": {
        "avatar" : getUserImg()
      },
      "offer": {
        "title": getPinTitle(titles),
        "address": null,
        "price": getRandomNum(1000000, 1000),
        "type": getType(types),
        "rooms": getRandomNum(5,1),
        "guests": getRandomNum(5,1),
        "checkin": 1,
        "checkout": 1,
        "features": 1,
        "description": 1,
        "photos": 1
      },
      "location": {
        "x": getRandomNum(1000, 200),
        "y": getRandomNum(630, 130)
      }
    }

  ];

  pin.offer.address = pin.location.x + ' ' + pin.location.y;

  console.log(pins);

})();
