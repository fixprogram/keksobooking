(function () {

  "use strict";

  let map = document.querySelector('.map');
  let mapPins = document.querySelector('.map__pins');
  let cards = [];
  let btnPopupClose = "";
  let mapMainPin = document.querySelector('.map__pin--main');

  let createEl = function(tagName, className, content, src, alt) {
    let el = document.createElement(tagName);
    el.classList.add(className);
    if(tagName === 'img') {
      el.src = src;
      el.alt = alt;
    }
    el.textContent = content;
    return el;
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
    card.appendChild(createEl('img', 'popup__avatar', '', data.author.avatar, 'Аватар пользователя'));
    card.appendChild(createEl('button', 'popup__close', 'Закрыть'));
    card.appendChild(createEl('p', 'popup__text--address', data.offer.address));
    card.appendChild(createEl('p', 'popup__text--price', data.offer.price));
    card.appendChild(createEl('h4', 'popup__type', data.offer.title));
    card.appendChild(createEl('p', 'popup__text--capacity', data.offer));
    card.appendChild(createEl('p', 'popup__text--time', data.offer.checkout));
    // create list of features
    card.appendChild(createEl('p', 'popup__description', data.offer.description));
    // create photos gallery
    cards.push(card);
    map.appendChild(card);
    return card;
  };

  let addPins = function(adData) {
    for(let i = 0; i < adData.length; i++) {
      mapPins.appendChild(createPin(adData[i]));
    }
  };

  let addClickListener = function(mapPin, data) {
      mapPin.addEventListener('click', function(evt){
        let popup = document.querySelector('.map__card');
        if(popup) {
          map.removeChild(popup);
        }
        let card = createCard(data);
        console.log(mapPin);
        btnPopupClose = document.querySelector('.popup__close');
        btnPopupClose.addEventListener('click', function(evt){
          map.removeChild(card);
        });
        window.addEventListener('keydown', function(evt){
          if(evt.keyCode === 27) {
            map.removeChild(card);
          }
        });
      });
  };

  let onSuccess = function(data) {
    let adData = data;
    // for(let i = 0; i < adData.length; i++) {
    //   createCard(adData[i]);
    // }
    window.renderPinsMarkup(adData);
    let mapPin = document.querySelectorAll('.map__pin');
    for(let i = 1; i < adData.length; i++) {
      let data = adData[i];
      let pin = mapPin[i];
      addClickListener(pin, data);
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
    window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
  };

  let pinMain = document.querySelector('.map__pin--main');

  pinMain.addEventListener('click', function(){
    renderMap();
  });

  let popupClose = function() {
    let card = document.querySelector('.map__card');
    map.removeChild(card);
  };

})();
