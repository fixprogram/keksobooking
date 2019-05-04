(function (){

  "use strict";

  var onSuccessLoad = function(data) {
    let adData = data;
    console.log(adData);
    return adData;
  };

  //console.log(adData);

  window.filter = {
    onLoad: onSuccessLoad
  };

  console.log(adData);

})();
