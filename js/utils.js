(function () {

  'use strict';

  const ESC_KEYCODE = 27;
  const DEBOUNCE_INTERVAL = 300;

  let onEscDown = function (evt, func) {
    if (evt.keyCode === ESC_KEYCODE) {
      func();
    }
  };

  let renderErrorMessage = function (errorMessage) {
    let message = document.createElement('div');
    message.classList.add('error-message');
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };

  let debounce = function (fun) {
    let lastTimeout = null;
    return function () {
      let args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    onEscDown: onEscDown,
    renderErrorMessage: renderErrorMessage,
    debounce: debounce
  };
})();

