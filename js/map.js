(function () {

  "use strict";

  let map = document.querySelector('.map');
  let mapPins = document.querySelector('.map__pins');
  let cards = [];
  let btnPopupClose = "";
  let buildingTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  let dragged = false;
  let form = document.querySelector('.ad-form');
  let formAddress = document.getElementById('address');
  let formFieldsets = document.querySelectorAll('.ad-form__element');
  const pinSize = {
    width: 65,
    height: 65
  };
  const dragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };
  const tailHeight = 16;

  formAddress.value = '600, 375';

  let createEl = function(tagName, className, content, addition) {
    let el = document.createElement(tagName);
    el.classList.add(className);

    if(tagName === 'p') {
      el.classList.add('popup__text');
    }

    if(className === 'popup__text--price') {
      el.textContent = content + ' ₽/ночь';
    } else if(className === 'popup__text--capacity') {
      el.textContent = content + ' комнаты для ' + addition + ' гостей';
    } else if(className === 'popup__text--time') {
      el.textContent = 'Заезд после ' + content + ', выезд до ' + addition;
    } else {
      el.textContent = content;
    }
    return el;
  };

  let createType = function(tagName, className, type) {
    let typeEl = document.createElement(tagName);
    typeEl.classList.add(className);
    typeEl.textContent = buildingTypes[type];
    return typeEl;
  };

  let createImg = function(className, src, alt) {
    let imgItem = document.createElement('img');
    imgItem.classList.add(className);
    imgItem.src = src;
    imgItem.alt = alt;
    return imgItem;
  };

  let createGallery = function(tagName, className, classChildName, photos, alt) {
    let gallery = document.createElement(tagName);
    gallery.classList.add(className);
    for(let i = 0; i < photos.length; i++) {
      let photo = document.createElement('img');
      photo.classList.add(classChildName);
      photo.src = photos[i];
      photo.width = 45;
      photo.height = 40;
      photo.alt = alt;
      gallery.appendChild(photo);
    }
    return gallery;
  };

  let createList = function(className, classChildName, array) {
    let list = document.createElement('ul');
    list.classList.add(className);
    for(let i = 0; i < array.length; i++) {
      let listEl = document.createElement('li');
      listEl.classList.add(classChildName);
      listEl.classList.add(classChildName + '--' + array[i]);
      list.appendChild(listEl);
    }
    return list;
  };

  let createPin = function(data) {
    let pinBtn = document.createElement('button');
    pinBtn.classList.add('map__pin');
    pinBtn.style.left = data.location.x + 'px';
    pinBtn.style.top = data.location.y + 'px';
    let pinImg = document.createElement('img');
    pinImg.src = data.author.avatar;
    pinImg.width = 45;
    pinImg.height = 45;
    pinBtn.appendChild(pinImg);
    return pinBtn;
  };

  let createCard = function(data) {
    let card = document.createElement('article');
    card.classList.add('map__card');
    card.classList.add('popup');
    card.appendChild(createImg('popup__avatar', data.author.avatar, 'Аватар пользователя'));
    card.appendChild(createEl('button', 'popup__close', 'Закрыть'));
    card.appendChild(createEl('h3', 'popup__title', data.offer.title));
    card.appendChild(createEl('p', 'popup__text--address', data.offer.address));
    card.appendChild(createEl('p', 'popup__text--price', data.offer.price));
    card.appendChild(createType('h4', 'popup__type', data.offer.type));
    card.appendChild(createEl('p', 'popup__text--capacity', data.offer.rooms, data.offer.guests));
    card.appendChild(createEl('p', 'popup__text--time', data.offer.checkin, data.offer.checkout));
    card.appendChild(createList('popup__features', 'popup__feature', data.offer.features));
    card.appendChild(createEl('p', 'popup__description', data.offer.description));
    card.appendChild(createGallery('div', 'popup__photos', 'popup__photo', data.offer.photos, 'Фотография жилья'));
    cards.push(card);
    map.appendChild(card);
    return card;
  };

  let addPins = function(adData) {
    // for(let i = 0; i < adData.length; i++) {
    //   mapPins.appendChild(createPin(adData[i]));
    // }
    adData.forEach((data) => mapPins.appendChild(createPin(data)));
  };

  let addClickListener = function(mapPin, data) {
      mapPin.addEventListener('click', function(evt){
        let popup = document.querySelector('.map__card');
        let card = createCard(data);
        if(popup) {
          map.removeChild(popup);
        }
        console.log(mapPin);
        btnPopupClose = document.querySelector('.popup__close');
        btnPopupClose.addEventListener('click', function(evt){
          map.removeChild(card);
        });
        if(popup) {
          window.addEventListener('keydown', function(evt){
            if(evt.keyCode === 27) {
              map.removeChild(card);
            }
          });
        }
      });
  };

  let onSuccess = function(data) {
    let adData = data;
    window.renderPinsMarkup(adData);
    console.log(adData);
    let mapPin = document.querySelectorAll('.map__pin');
    let pinsArray = Array.prototype.slice.call(mapPin);
    pinsArray.shift();
    for(let i = 0; i < pinsArray.length; i++) {
      addClickListener(pinsArray[i], adData[i]);
    }
  };

  let onError = function(message) {
    console.error(message);
  };

  window.renderPinsMarkup = function (pinsData) {
    addPins(pinsData);
    console.log(pinsData);
  };

  let renderMap = function() {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
    pinMain.removeEventListener('mouseup', renderMap);
    formFieldsets.forEach((it) => it.disabled = false);
  };

  let pinMain = document.querySelector('.map__pin--main');

  pinMain.addEventListener('mouseup', renderMap);

  ////// Drag n Drop

  pinMain.addEventListener('mousedown', function(evt){
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let pinMainPosition = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };

      // pinMain.style.top = pinMainPosition.y + 'px';
      // pinMain.style.left = pinMainPosition.x + 'px';

      var Border = {
        TOP: dragLimit.Y.MIN - pinMain.offsetHeight - tailHeight,
        BOTTOM: dragLimit.Y.MAX - pinMain.offsetHeight - tailHeight,
        LEFT: dragLimit.X.MIN,
        RIGHT: dragLimit.X.MAX - pinMain.offsetWidth
      };
      if (pinMainPosition.x >= Border.LEFT && pinMainPosition.x <= Border.RIGHT) {
        pinMain.style.left = pinMainPosition.x + 'px';
      }
      if (pinMainPosition.y >= Border.TOP && pinMainPosition.y <= Border.BOTTOM) {
        pinMain.style.top = pinMainPosition.y + 'px';
      }

      let pinTailPosition = {
        x: pinMainPosition.x + Math.ceil(pinSize.width / 2),
        y: pinMainPosition.y + pinSize.height + tailHeight
      };

      formAddress.value = pinTailPosition.x + ', ' + pinTailPosition.y;
      //window.form.setAddress(pinTailPosition.x, pinTailPosition.y);
    };

    let onMouseUp = function(upEvt) {
      upEvt.preventDefault();

      if(dragged) {
        let onClickPreventDefault = function(evt) {
          evt.preventDefault();
          pinMain.removeEventListener('click', onClickPreventDefault);
        };
        pinMain.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
