(function () {

  'use strict';

  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  const DEFAULT_AVATAR = 'img/muffin-grey.svg';

  const ImageParams = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  let avatarPreview = document.querySelector('.ad-form-header__preview img');
  let imagesContainer = document.querySelector('.ad-form__photo-container');
  let avatarChooser = document.querySelector('#avatar');
  let imageChooser = document.querySelector('#images');

  let filtrationByCorrectType = function (file) {
    return FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
  };

  let changeAvatar = function (src) {
    avatarPreview.src = src;
  };

  let removeEmptyImgWrap = function () {
    let emptyImgWrap = document.querySelector('.ad-form__photo--empty');
    if (emptyImgWrap) {
      emptyImgWrap.remove();
    }
  };

  var addImages = function (src) {
    var newImageWrap = document.createElement('div');
    var image = document.createElement('img');
    newImageWrap.classList.add('ad-form__photo');
    newImageWrap.classList.add('ad-form__photo--added');
    image.src = src;
    image.style.width = ImageParams.WIDTH;
    image.style.height = ImageParams.HEIGHT;
    image.style.borderRadius = ImageParams.BORDER_RADIUS;
    newImageWrap.appendChild(image);
    imagesContainer.appendChild(newImageWrap);
    removeEmptyImgWrap();
  };

  var addEmptyImgWrap = function () {
    if (!document.querySelector('.ad-form__photo--empty')) {
      var emptyImgWrap = document.createElement('div');
      emptyImgWrap.classList.add('ad-form__photo');
      emptyImgWrap.classList.add('ad-form__photo--empty');
      imagesContainer.appendChild(emptyImgWrap);
    }
  };

  var loadFile = function (chooser, func) {
    var files = Array.from(chooser.files).filter(filtrationByCorrectType);
    if (files) {
      files.forEach(function (it) {
        var reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          func(evt.target.result);
        });
        reader.readAsDataURL(it);
      });
    }
  };

  var removeImages = function () {
    avatarPreview.src = DEFAULT_AVATAR;
    var addedImages = document.querySelectorAll('.ad-form__photo--added');
    if (addedImages) {
      addedImages.forEach(function (it) {
        it.remove();
      });
    }
    addEmptyImgWrap();
  };

  var onAvatarChange = function (evt) {
    loadFile(evt.target, changeAvatar);
  };

  var onPhotoChange = function (evt) {
    loadFile(evt.target, addImages);
  };

  var activate = function () {
    avatarChooser.addEventListener('change', onAvatarChange);
    imageChooser.addEventListener('change', onPhotoChange);
  };

  var deactivate = function () {
    avatarChooser.removeEventListener('change', onAvatarChange);
    imageChooser.removeEventListener('change', onPhotoChange);
  };

  window.loadImage = {
    activate: activate,
    deactivate: deactivate,
    remove: removeImages
  };
})();
