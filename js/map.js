(function () {

  'use strict';

  const TAIL_HEIGHT = 16;
  const DEFAULT_MAIN_PIN_X = 600;
  const DEFAULT_MAIN_PIN_Y = 375;

  const PinSize = {
    WIDTH: 65,
    HEIGHT: 65,
  };

  const DragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  const TypesMap = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  let template = document.querySelector('template');
  let map = document.querySelector('.map');
  let mapPins = document.querySelector('.map__pins');
  let mapPinTemplate = template.content.querySelector('.map__pin');
  let adTemplate = template.content.querySelector('.map__card');
  let popupPhoto = template.content.querySelector('.popup__photo');
  let mapFiltersContainer = document.querySelector('.map__filters-container');
  let mapFiltersSelects = document.querySelectorAll('.map__filter');
  let mapFiltersFieldset = document.querySelector('#housing-features');
  let mainPin = document.querySelector('.map__pin--main');
  let activePage = false;

  let removePins = function () {
    let mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (it) {
      it.remove();
    });
  };

  let removeMapCard = function () {
    let mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  let activateFilter = function () {
    mapFiltersSelects.forEach(function (it) {
      it.disabled = false;
    });
    mapFiltersFieldset.disabled = false;
  };

  let deactivateFilter = function () {
    mapFiltersSelects.forEach(function (it) {
      it.disabled = true;
    });
    mapFiltersFieldset.disabled = true;
  };

  let onLoadSuccess = function (adData) {
    window.filter.activate(adData);
  };

  let onLoadError = function (errorMessage) {
    window.utils.renderErrorMessage(errorMessage);
  };

  let createPinMarkup = function (pinData) {
    let pinItem = mapPinTemplate.cloneNode(true);
    pinItem.querySelector('img').src = pinData.author.avatar;
    pinItem.style.left = pinData.location.x + 'px';
    pinItem.style.top = pinData.location.y + 'px';
    pinItem.querySelector('img').alt = pinData.offer.title;
    let onPinItemClick = function () {
      let mapCardRemovable = map.querySelector('.map__card');
      if (mapCardRemovable) {
        mapCardRemovable.remove();
      }
      createAd(pinData);
    };
    pinItem.addEventListener('click', onPinItemClick);
    return pinItem;
  };

  let renderPinsMarkup = function (pinsData) {
    let mapPinsFragment = document.createDocumentFragment();
    pinsData.forEach(function (it) {
      mapPinsFragment.appendChild(createPinMarkup(it));
    });
    mapPins.appendChild(mapPinsFragment);
  };

  let createFeatureFragment = function (adData) {
    let featureFragment = document.createDocumentFragment();
    adData.offer.features.forEach(function (it) {
      let featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  };

  let createPhotosFragment = function (adData) {
    let photosFragment = document.createDocumentFragment();
    adData.offer.photos.forEach(function (it) {
      let popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = it;
      photosFragment.appendChild(popupPhotoItem);
    });
    return photosFragment;
  };

  let createAd = function (adData) {
    let ad = adTemplate.cloneNode(true);
    ad.querySelector('.map__card img').src = adData.author.avatar;
    ad.querySelector('.popup__title').textContent = adData.offer.title;
    ad.querySelector('.popup__text--price').textContent = adData.offer.price + ' ₽/ночь';
    ad.querySelector('.popup__type').textContent = TypesMap[adData.offer.type.toUpperCase()];
    ad.querySelector('.popup__text--capacity').textContent = adData.offer.rooms + ' комнаты для ' + adData.offer.guests + ' гостей';
    ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + adData.offer.checkin + ', выезд до ' + adData.offer.checkout;
    ad.querySelector('.popup__features').innerHTML = '';
    ad.querySelector('.popup__features').appendChild(createFeatureFragment(adData));
    ad.querySelector('.popup__description').textContent = adData.offer.description;
    ad.querySelector('.popup__photos').removeChild(ad.querySelector('.popup__photo'));
    ad.querySelector('.popup__photos').appendChild(createPhotosFragment(adData));
    mapFiltersContainer.insertAdjacentElement('beforebegin', ad);
    let closeAdBtn = ad.querySelector('.popup__close');
    let closeAd = function () {
      ad.remove();
      closeAdBtn.removeEventListener('click', onCloseAdBtnClick);
      document.removeEventListener('keydown', onAdEscDown);
    };
    let onCloseAdBtnClick = function () {
      closeAd();
    };
    closeAdBtn.addEventListener('click', onCloseAdBtnClick);
    let onAdEscDown = function (evt) {
      window.utils.onEscDown(evt, closeAd);
    };
    document.addEventListener('keydown', onAdEscDown);
    return ad;
  };

  let onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      let mainPinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };
      let Border = {
        TOP: DragLimit.Y.MIN - mainPin.offsetHeight - TAIL_HEIGHT,
        BOTTOM: DragLimit.Y.MAX - mainPin.offsetHeight - TAIL_HEIGHT,
        LEFT: DragLimit.X.MIN,
        RIGHT: DragLimit.X.MAX - mainPin.offsetWidth
      };
      if (mainPinPosition.x >= Border.LEFT && mainPinPosition.x <= Border.RIGHT) {
        mainPin.style.left = mainPinPosition.x + 'px';
      }
      if (mainPinPosition.y >= Border.TOP && mainPinPosition.y <= Border.BOTTOM) {
        mainPin.style.top = mainPinPosition.y + 'px';
      }
      let pinTailCoords = {
        x: mainPinPosition.x + Math.ceil(PinSize.WIDTH / 2),
        y: mainPinPosition.y + PinSize.HEIGHT + TAIL_HEIGHT
      };
      window.form.setAddress(pinTailCoords);
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!activePage) {
        activateMap();
        window.form.activate();
        activePage = true;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  let getMainPinDefaultCoords = function () {
    return {
      x: DEFAULT_MAIN_PIN_X,
      y: DEFAULT_MAIN_PIN_Y
    };
  };

  let activateMap = function () {
    window.backend.load(onLoadSuccess, onLoadError);
    map.classList.remove('map--faded');
    activateFilter();
  };

  let deactivateMap = function () {
    map.classList.add('map--faded');
    removePins();
    removeMapCard();
    mainPin.style.top = DEFAULT_MAIN_PIN_Y - PinSize.HEIGHT / 2 + 'px';
    mainPin.style.left = DEFAULT_MAIN_PIN_X - PinSize.WIDTH / 2 + 'px';
    deactivateFilter();
    activePage = false;
  };

  let initPage = function () {
    deactivateMap();
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };

  initPage();

  window.map = {
    getMainPinDefaultCoords: getMainPinDefaultCoords,
    deactivate: deactivateMap,
    removePins: removePins,
    removeMapCard: removeMapCard,
    renderPinsMarkup: renderPinsMarkup
  };
})();
