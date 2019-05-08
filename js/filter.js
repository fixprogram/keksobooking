(function () {

  'use strict';

  const PINS_LIMIT = 5;

  const PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  let filter = document.querySelector('.map__filters');
  let filterItems = filter.querySelectorAll('select, input');
  let typeSelect = filter.querySelector('#housing-type');
  let priceSelect = filter.querySelector('#housing-price');
  let roomsSelect = filter.querySelector('#housing-rooms');
  let guestsSelect = filter.querySelector('#housing-guests');
  let featuresFieldset = filter.querySelector('#housing-features');
  let data = [];
  let filteredData = [];

  let filtrationItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  let filtrationByType = function (item) {
    return filtrationItem(typeSelect, item.offer, 'type');
  };

  let filtrationByPrice = function (item) {
    let filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  };

  let filtrationByRooms = function (item) {
    return filtrationItem(roomsSelect, item.offer, 'rooms');
  };

  let filtrationByGuests = function (item) {
    return filtrationItem(guestsSelect, item.offer, 'guests');
  };

  let filtrationByFeatures = function (item) {
    let checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  let onFilterChange = window.utils.debounce(function () {
    filteredData = data.slice(0);
    filteredData = filteredData.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);
    window.map.removePins();
    window.map.removeMapCard();
    window.map.renderPinsMarkup(filteredData.slice(0, PINS_LIMIT));
  });

  let activateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = false;
    });
    onFilterChange();
    filter.addEventListener('change', onFilterChange);
  };

  let resetFilter = function () {
    filterItems.forEach(function (it) {
      it.value = 'any';
    });
    let featuresItems = featuresFieldset.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  };

  let deactivateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = true;
    });
    resetFilter();
    filter.removeEventListener('change', onFilterChange);
  };

  let activateFiltration = function (adData) {
    data = adData.slice(0);
    activateFilter();
    return adData.slice(0, PINS_LIMIT);
  };

  let deactivateFiltration = function () {
    deactivateFilter();
  };

  window.filter = {
    activate: activateFiltration,
    deactivate: deactivateFiltration
  };
})();
