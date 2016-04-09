window.onload = function() {
  var whatlangContainer = document.getElementById("whatlangContainer");
  var WhatLang = require("./whatlang");
  var whatlang = new WhatLang({
    containerNode: whatlangContainer
  });
}
