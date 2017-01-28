var WhatLang = require("./whatlang/whatlang");

window.onload = function() {
  var whatlangContainer = document.getElementById("whatlangContainer");
  var whatlang = new WhatLang({
    containerNode: whatlangContainer
  });
}
