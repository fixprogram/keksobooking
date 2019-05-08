(function () {

  'use strict';

  const RoomGuestRation = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  const BuildingMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  let adForm = document.querySelector('.ad-form');
  let adFormFieldsets = document.querySelectorAll('.ad-form__element');
  let adFormHeader = document.querySelector('.ad-form-header');
  let addressInput = document.querySelector('#address');
  let success = document.querySelector('.success');
  let titleInput = document.querySelector('#title');
  let typeInput = document.querySelector('#type');
  let priceInput = document.querySelector('#price');
  let timeInInput = document.querySelector('#timein');
  let timeOutInput = document.querySelector('#timeout');
  let roomNumberSelect = document.querySelector('#room_number');
  let capacitySelect = document.querySelector('#capacity');
  let submitBtn = document.querySelector('.ad-form__submit');
  let resetBtn = document.querySelector('.ad-form__reset');
  let invalidElements = [];

  let setAddressCoords = function (coords) {
    addressInput.value = coords.x + ', ' + coords.y;
  };

  let onTypeInputChange = function (evt) {
    let minPrice = BuildingMinPrice[evt.target.value.toUpperCase()];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice.toString();
  };

  let onTimeInInputChange = function (evt) {
    timeOutInput.value = evt.target.value;
  };

  let onTimeOutInputChange = function (evt) {
    timeInInput.value = evt.target.value;
  };

  let disableСapacityOptions = function (inputValue) {
    let capacityOptions = capacitySelect.querySelectorAll('option');
    capacityOptions.forEach(function (it) {
      it.disabled = true;
    });
    RoomGuestRation[inputValue].forEach(function (it) {
      capacitySelect.querySelector('option' + '[value="' + it + '"]').disabled = false;
      capacitySelect.value = it;
    });
  };

  let highlightInvalidElement = function (item) {
    invalidElements.push(item);
    item.classList.add('invalid-element');
  };

  let unhighlightInvalidElement = function (item) {
    invalidElements.splice(invalidElements.indexOf(item), 1);
    item.classList.remove('invalid-element');
  };

  let onFormInvalid = function (evt) {
    highlightInvalidElement(evt.target);
  };

  let onElementCheckValidity = function (evt) {
    if (!evt.target.checkValidity()) {
      highlightInvalidElement(evt.target);
    } else if (invalidElements.indexOf(evt.target) !== 1) {
      unhighlightInvalidElement(evt.target);
    }
  };

  let checkPlaceValidity = function () {
    let roomGuests = RoomGuestRation[roomNumberSelect.value];
    let message = roomGuests.indexOf(+capacitySelect.value) === -1 ? 'Количество гостей не влезут в выбранную комнату' : '';
    capacitySelect.setCustomValidity(message);
  };

  let onRoomNumberSelectChange = function (evt) {
    evt.target.setCustomValidity('');
    disableСapacityOptions(roomNumberSelect.value);
  };

  let onCapacitySelectChange = function (evt) {
    evt.target.setCustomValidity('');
  };

  let onSubmitBtnClick = function () {
    checkPlaceValidity();
  };

  let onSuccessEscDown = function (evt) {
    window.utils.onEscDown(evt, closeSuccess);
  };

  let onSuccessClick = function () {
    closeSuccess();
  };

  let closeSuccess = function () {
    success.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessEscDown);
    success.removeEventListener('click', onSuccessClick);
  };

  let showSuccess = function () {
    success.classList.remove('hidden');
    document.addEventListener('keydown', onSuccessEscDown);
    success.addEventListener('click', onSuccessClick);
  };

  let onSubmitSuccess = function () {
    showSuccess();
    deactivateForm();
    window.map.deactivate();
    window.filter.deactivate();
  };

  let onSubmitError = function (errorMessage) {
    window.utils.renderErrorMessage(errorMessage);
  };

  let onAdFormSubmit = function (evt) {
    evt.preventDefault();
    let formData = new FormData(adForm);
    window.backend.upload(onSubmitSuccess, onSubmitError, formData);
  };

  let onResetBtnClick = function (evt) {
    evt.preventDefault();
    deactivateForm();
    window.map.deactivate();
    window.filter.deactivate();
    window.loadImage.remove();
  };

  let addFormListeners = function () {
    adForm.addEventListener('invalid', onFormInvalid, true);
    priceInput.addEventListener('change', onElementCheckValidity);
    titleInput.addEventListener('change', onElementCheckValidity);
    typeInput.addEventListener('change', onTypeInputChange);
    timeInInput.addEventListener('change', onTimeInInputChange);
    timeOutInput.addEventListener('change', onTimeOutInputChange);
    roomNumberSelect.addEventListener('change', onRoomNumberSelectChange);
    capacitySelect.addEventListener('change', onCapacitySelectChange);
    submitBtn.addEventListener('click', onSubmitBtnClick);
    adForm.addEventListener('submit', onAdFormSubmit);
    resetBtn.addEventListener('click', onResetBtnClick);
  };

  let removeFormListeners = function () {
    adForm.removeEventListener('invalid', onFormInvalid, true);
    priceInput.removeEventListener('change', onElementCheckValidity);
    titleInput.removeEventListener('change', onElementCheckValidity);
    typeInput.removeEventListener('change', onTypeInputChange);
    timeInInput.removeEventListener('change', onTimeInInputChange);
    timeOutInput.removeEventListener('change', onTimeOutInputChange);
    roomNumberSelect.removeEventListener('change', onRoomNumberSelectChange);
    capacitySelect.removeEventListener('change', onCapacitySelectChange);
    submitBtn.removeEventListener('click', onSubmitBtnClick);
    adForm.removeEventListener('submit', onAdFormSubmit);
    resetBtn.removeEventListener('click', onResetBtnClick);
  };

  let activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach(function (it) {
      it.disabled = false;
    });
    adFormHeader.disabled = false;
    window.loadImage.activate();
    addFormListeners();
  };

  let deactivateForm = function () {
    adForm.reset();
    adFormFieldsets.forEach(function (it) {
      it.disabled = true;
    });
    adFormHeader.disabled = true;
    adForm.classList.add('ad-form--disabled');
    window.loadImage.deactivate();
    window.loadImage.remove();
    setAddressCoords(window.map.getMainPinDefaultCoords());
    removeFormListeners();
  };

  deactivateForm();

  window.form = {
    setAddress: setAddressCoords,
    activate: activateForm
  };
})();
