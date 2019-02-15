"use strict";

(function () {

  var texts = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
  var houseTypes = ['palace', 'flat', 'house', 'bungalo'];
  var checkDates = ['13:00', '14:00', '15:00'];
  var featuresList = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  var arrayOfObjects = [];

  window.dataFunctions = {
    giveImg : function(i) {
      return 'img/avatars/user0'+(i+1)+'.png';
    },
    giveText : function(i, texts) {
      return texts[i];
    },
    getX : function() {
      return Math.floor(Math.random() * (100 - 1) + 1) * 10;
    },
    getY : function() {
      return Math.floor(Math.random() * (100 - 1) + 1) * 10;
    },
    getPrice : function() {
      return Math.floor(Math.random() * (100 - 10) + 10) * 100;
    },
    getHouseType : function(houseTypes) {
      var i = Math.floor(Math.random() * (houseTypes.length - 0) + 0);
      if(houseTypes[i] == 'palace') {
        return 'Дворец';
      } else if(houseTypes[i] == 'flat') {
        return 'Квартира';
      } else if(houseTypes[i] == 'house') {
        return 'Дом';
      } else {
        return 'Бунгало';
      }
    },
    getRoomsNumber : function() {
      var roomsNumber = Math.floor(Math.random() * (6 - 1) + 1);
      if(roomsNumber == 1) {
        roomsNumber += ' комната';
      } else {
        roomsNumber += ' комнаты';
      }
      return roomsNumber;
    },
    getGuestsNumber : function() {
      var guestsNumber = Math.floor(Math.random() * (6 - 1) + 1);
      if(guestsNumber == 1) {
        guestsNumber += ' гостя';
      } else {
        guestsNumber += ' гостей';
      }
      return guestsNumber;
    },
    getCheckIn : function(checkDates) {
      var i = Math.floor(Math.random() * (checkDates.length - 0) + 0);
      return checkDates[i];
    },
    getCheckOut : function (checkDates) {
      var i = Math.floor(Math.random() * (checkDates.length - 0) + 0);
      return checkDates[i];
    },
    getFeatures : function(featuresList) {
      var size = Math.floor(Math.random() * (featuresList.length - 0) + 0);
      var arrayOfFeatures = [];
      for(var i = 0; i < size; i++) {
        arrayOfFeatures.push(featuresList[i]);
      }
      return arrayOfFeatures;
    },
    getRandomNumber : function(photos) {
      return Math.floor(Math.random() * (photos.length - 0) + 0);
    },
    getPhotos : function(photos) {
      var randomArray = [];
      for(var i = 0; i < photos.length; i++) {
        randomArray.push(photos[dataFunctions.getRandomNumber(photos)]);
      }
      return randomArray;
    },
    getRandomLocation : function(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  };

  window.createMapObject = function(i, dataFunctions) {
      var mapObject = {
          'author' : {
              'avatar' : dataFunctions.giveImg(i)
          },
          'offer' : {
              'title' : dataFunctions.giveText(i, texts),
              'address' : ''+dataFunctions.getX()+' - '+dataFunctions.getY()+' Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
              'price' : dataFunctions.getPrice(),
              'type' : dataFunctions.getHouseType(houseTypes),
              'rooms' : dataFunctions.getRoomsNumber(),
              'guests' : dataFunctions.getGuestsNumber(),
              'checkin' : dataFunctions.getCheckIn(checkDates),
              'checkout' : dataFunctions.getCheckOut(checkDates),
              'features' : dataFunctions.getFeatures(featuresList),
              'description' : 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
              'photos' : dataFunctions.getPhotos(photos)
          },
          'location' : {
            'x' : dataFunctions.getRandomLocation(1150, 300),
            'y' : dataFunctions.getRandomLocation(704, 154)
          }
      };
      return mapObject;
  };

})();
