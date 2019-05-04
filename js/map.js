(function () {

  "use strict";

  const map = document.querySelector('.map');

  let pins = [];

  map.classList.remove('map--faded');

  window.createPin = function(adData) {
    for(let i = 0; i < adData.length; i++) {
      let pin = {
        "author": {
          "avatar" : adData[i].author.avatar,
        },
        "offer": {
          "title" : adData[i].offer.title,
          "address" : adData[i].offer.address,
          "price" : adData[i].offer.price,
          "type" : adData[i].offer.type,
          "rooms" : adData[i].offer.rooms,
          "guests" : adData[i].offer.guests,
          "checkin" : adData[i].offer.checkin,
          "checkout" : adData[i].offer.checkout,
          "features" : adData[i].offer.features,
          "description" : adData[i].offer.description,
          "photos": adData[i].offer.photos
        },
        "location": {
          "x": adData[i].location.x,
          "y": adData[i].location.y
        }
      };
      pins.push(pin);
    }
    console.log(pins);
  };
//////// СОЗДАНИЕ МАССИВОВ ПИНОВ УЖЕ ЕСТЬ В JSON. ПРОВЕРИТЬ И СДЕЛАТЬ ФУНКЦИЮ ПО ПОКАЗУ ЭТОГО
  // let pins = [

  //   pin = {
  //     "author": {
  //       "avatar" : getUserImg()
  //     },
  //     "offer": {
  //       "title": getPinTitle(titles),
  //       "address": null,
  //       "price": getRandomNum(1000000, 1000),
  //       "type": getType(types),
  //       "rooms": getRandomNum(5,1),
  //       "guests": getRandomNum(5,1),
  //       "checkin": 1,
  //       "checkout": 1,
  //       "features": 1,
  //       "description": 1,
  //       "photos": 1
  //     },
  //     "location": {
  //       "x": getRandomNum(1000, 200),
  //       "y": getRandomNum(630, 130)
  //     }
  //   }

  // ];

// Geting data from backend

  let onSuccess = function(data) {
    window.filter.onLoad(data);
  };

  let onError = function(message) {
    console.error(message);
  };

  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);

///////////////////////////////

  //console.log(window.adData);

})();
