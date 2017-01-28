var CodeMirror = require("codemirror");
require("codemirror/lib/codemirror.css");

var LanguageDetector = require("./language_detector");
var objectAssign = require('object-assign');

function WhatLang(options) {
  this.containerNode = options.containerNode;
  this.initialize();
}

objectAssign(WhatLang.prototype, {
  initialize: function() {
    this._editor = CodeMirror(this.containerNode, {
      value: "var test = true;",
      mode: "javascript"
    });

    this._editor.on("change", this.onChange.bind(this));
  },
  onChange: function(editor, changeObj){
    if (this._detectModeTimeout) {
      window.clearTimeout(this._detectModeTimeout);
    }
    this._detectModeTimeout = window.setTimeout(this.detectMode.bind(this), 1000);
  },
  detectMode: function() {
    var valueString = this._editor.getValue();
    var sortedPossibleLanguages = LanguageDetector.getSortedPossibleLanguagesArray(valueString);

    console.log(sortedPossibleLanguages);

    this._detectModeTimeout = null;
  }
});

module.exports = WhatLang;
