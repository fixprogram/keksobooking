"use strict";

var texts = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var houseTypes = ['palace', 'flat', 'house', 'bungalo'];
var checkDates = ['13:00', '14:00', '15:00'];
var featuresList = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

function giveImg(i) {
    return 'img/avatars/user0'+(i+1)+'.png';
}

function giveText(i, texts) {
    return texts[i];
}

function getX() {
    return Math.floor(Math.random() * (100 - 1) + 1) * 10;
}

function getY() {
    return Math.floor(Math.random() * (100 - 1) + 1) * 10;
}

function getPrice() {
    return Math.floor(Math.random() * (100 - 10) + 10) * 100;
}

function getHouseType(houseTypes) {
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
}

function getRoomsNumber() {
    var roomsNumber = Math.floor(Math.random() * (6 - 1) + 1);
    if(roomsNumber == 1) {
      roomsNumber += ' комната';
    } else {
      roomsNumber += ' комнаты';
    }
    return roomsNumber;
}

function getGuestsNumber() {
    var guestsNumber = Math.floor(Math.random() * (6 - 1) + 1);
    if(guestsNumber == 1) {
      guestsNumber += ' гостя';
    } else {
      guestsNumber += ' гостей';
    }
    return guestsNumber;
}

function getCheckIn(checkDates) {
    var i = Math.floor(Math.random() * (checkDates.length - 0) + 0);
    return checkDates[i];
}

function getCheckOut(checkDates) {
    var i = Math.floor(Math.random() * (checkDates.length - 0) + 0);
    return checkDates[i];
}

function getFeatures(featuresList) {
    var size = Math.floor(Math.random() * (featuresList.length - 0) + 0);
    var arrayOfFeatures = [];
    for(var i = 0; i < size; i++) {
        arrayOfFeatures.push(featuresList[i]);
    }
    return arrayOfFeatures;
}

function getRandomNumber(photos) {
    return Math.floor(Math.random() * (photos.length - 0) + 0);
}

function getPhotos(photos) {
    var randomArray = [];
    for(var i = 0; i < photos.length; i++) {
        randomArray.push(photos[getRandomNumber(photos)]);
    }
    return randomArray;
}

function getRandomLocation(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

var arrayOfObjects = [];

function createMapObject(i) {
    var mapObject = {
        'author' : {
            'avatar' : giveImg(i)
        },
        'offer' : {
            'title' : giveText(i, texts),
            'address' : ''+getX()+' - '+getY()+' Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
            'price' : getPrice(),
            'type' : getHouseType(houseTypes),
            'rooms' : getRoomsNumber(),
            'guests' : getGuestsNumber(),
            'checkin' : getCheckIn(checkDates),
            'checkout' : getCheckOut(checkDates),
            'features' : getFeatures(featuresList),
            'description' : 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
            'photos' : getPhotos(photos)
        },
        'location' : {
          'x' : getRandomLocation(1150, 300),
          'y' : getRandomLocation(704, 154)
        }
    };
    arrayOfObjects.push(mapObject);
}

var map = document.querySelector('.map');

var pins = document.querySelector('.map__pins');

function createPin(x, y, src, alt) {
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
}

function createSomeElement(tagName, className, isClose, type, text, list, gallery, src, title) {
  var elem = document.createElement(tagName);
  if(tagName == 'p') {
    elem.classList.add('popup__text');
  }
  elem.classList.add(className);
  if(isClose) {
    elem.innerHTML = 'Закрыть';
  }
  if(type) {
    elem.type = 'button';
  }
  if(text) {
    elem.innerHTML = text;
  }
  if(list) {
    if(arrayOfObjects[i].offer.features.length > 1) {
      for(var j = 0; j < arrayOfObjects[i].offer.features.length; j++) {
        elem.appendChild(createFeatureElement(arrayOfObjects[i].offer.features[j]));
      }
    }
  }
  if(gallery) {
    for(var n = 0; n < photos.length; n++) {
      elem.appendChild(createPhotoElement(src[n], title));
    }
  }
  return elem;
}

function createFeatureElement(itemClass) {
  var feature = document.createElement('li');
  feature.classList.add('popup__feature');
  feature.classList.add('popup__feature--'+itemClass+'');
  return feature;
}

function createPhotoElement(src, title) {
  var img = document.createElement('img');
  img.classList.add('popup__photo');
  img.src = src;
  img.alt = title;
  img.width = 45;
  img.height = 40;
  return img;
}

var mapFilters = document.querySelector('.map__filters-container');

function createMapPopup(titleElement, srcElement, title, address, price, type, rooms, guests, checkin, checkout, description, srcPhoto) {
  var popup = document.createElement('article');
  popup.classList.add('map__card');
  var img = document.createElement('img');
  img.classList.add('popup__avatar');
  img.alt = titleElement;
  img.src = srcElement;
  popup.appendChild(img);
  popup.appendChild(createSomeElement('button', 'popup__close', true, true));
  popup.appendChild(createSomeElement('h3', 'popup__title', '', '', title));
  popup.appendChild(createSomeElement('p', 'popup__text--address', '', '', address));
  popup.appendChild(createSomeElement('p', 'popup__text--price', '', '', price+' Р/ночь'));
  popup.appendChild(createSomeElement('h4', 'popup__type', '', '', type));
  popup.appendChild(createSomeElement('p', 'popup__text--capacity', '', '', ''+(rooms + ' для ' + guests)+''));
  popup.appendChild(createSomeElement('p', 'popup__text--time', '', '', ''+('Заезд после ' + checkin + ' выезд до ' + checkout)+''));
  popup.appendChild(createSomeElement('ul', 'popup__features', '', '', '', true));
  popup.appendChild(createSomeElement('p', 'popup__description', '', '', description));
  popup.appendChild(createSomeElement('div', 'popup__photos', '', '', '', '', true, srcPhoto, titleElement));
  map.insertBefore(popup, mapFilters);
}

for(var i = 0; i < 8; i++) {
  createMapObject(i);
  createPin(arrayOfObjects[i].location.x, arrayOfObjects[i].location.y, arrayOfObjects[i].author.avatar, arrayOfObjects[i].offer.title);
  createMapPopup(arrayOfObjects[i].offer.title, arrayOfObjects[i].author.avatar, arrayOfObjects[i].offer.title, arrayOfObjects[i].offer.address, arrayOfObjects[i].offer.price, arrayOfObjects[i].offer.type, arrayOfObjects[i].offer.rooms, arrayOfObjects[i].offer.guests, arrayOfObjects[i].offer.checkin, arrayOfObjects[i].offer.checkout, arrayOfObjects[i].offer.description, arrayOfObjects[i].offer.photos);
}

const PIN_SIZE = 65;

var inputAddress = document.getElementById('address');
inputAddress.value = ''+1200/2+', '+750/2+'';

var mapPinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
mapPinMain.addEventListener('mouseup', function() {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');

});
