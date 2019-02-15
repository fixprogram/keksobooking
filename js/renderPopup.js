// "use strict";

// (function () {
  // var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  // var map = document.querySelector('.map');
  // var mapFilters = document.querySelector('.map__filters-container');

//   function createSomeElement(tagName, className, isClose, type, text, list, gallery, src, title) {
//     var elem = document.createElement(tagName);
//     if(tagName == 'p') {
//       elem.classList.add('popup__text');
//     }
//     elem.classList.add(className);
//     if(isClose) {
//       elem.innerHTML = 'Закрыть';
//     }
//     if(type) {
//       elem.type = 'button';
//     }
//     if(text) {
//       elem.innerHTML = text;
//     }
//     if(list) {
//       if(window.arrayOfObjects[i].offer.features.length > 1) {
//         for(var j = 0; j < window.arrayOfObjects[i].offer.features.length; j++) {
//           elem.appendChild(createFeatureElement(window.arrayOfObjects[i].offer.features[j]));
//         }
//       }
//     }
//     if(gallery) {
//       for(var n = 0; n < photos.length; n++) {
//         elem.appendChild(createPhotoElement(src[n], title));
//       }
//     }
//     return elem;
//   }

//   function createFeatureElement(itemClass) {
//     var feature = document.createElement('li');
//     feature.classList.add('popup__feature');
//     feature.classList.add('popup__feature--'+itemClass+'');
//     return feature;
//   }

//   function createPhotoElement(src, title) {
//     var img = document.createElement('img');
//     img.classList.add('popup__photo');
//     img.src = src;
//     img.alt = title;
//     img.width = 45;
//     img.height = 40;
//     return img;
//   }

//   for(var i = 0; i < 8; i++) {
//   window.renderPopup = function(titleElement, srcElement, title, address, price, type, rooms, guests, checkin, checkout, description, srcPhoto) {
//     var popup = document.createElement('article');
//     popup.classList.add('map__card');
//     var img = document.createElement('img');
//     img.classList.add('popup__avatar');
//     img.alt = titleElement;
//     img.src = srcElement;
//     popup.appendChild(img);
//     popup.appendChild(createSomeElement('button', 'popup__close', true, true));
//     popup.appendChild(createSomeElement('h3', 'popup__title', '', '', title));
//     popup.appendChild(createSomeElement('p', 'popup__text--address', '', '', address));
//     popup.appendChild(createSomeElement('p', 'popup__text--price', '', '', price+' Р/ночь'));
//     popup.appendChild(createSomeElement('h4', 'popup__type', '', '', type));
//     popup.appendChild(createSomeElement('p', 'popup__text--capacity', '', '', ''+(rooms + ' для ' + guests)+''));
//     popup.appendChild(createSomeElement('p', 'popup__text--time', '', '', ''+('Заезд после ' + checkin + ' выезд до ' + checkout)+''));
//     popup.appendChild(createSomeElement('ul', 'popup__features', '', '', '', true));
//     popup.appendChild(createSomeElement('p', 'popup__description', '', '', description));
//     popup.appendChild(createSomeElement('div', 'popup__photos', '', '', '', '', true, srcPhoto, titleElement));
//     map.insertBefore(popup, mapFilters);
//   };
// }

// })();
