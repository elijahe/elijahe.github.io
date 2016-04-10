var CodeMirror = require("codemirror");
require("codemirror/addon/runmode/runmode");

// TODO: generate languages array by reading CodeMirror directory
var languages = ["css", "htmlmixed", "javascript"];
var modes = languages.map(function(language) {
  return require("codemirror/mode/" + language + "/" + language);
});

var objectAssign = require('object-assign');

function WhatLang(options) {
  this.containerNode = options.containerNode;
  this.initialize();
}

objectAssign(WhatLang.prototype, {
  initialize: function() {
    this._editor = CodeMirror(this.containerNode, {
      value: "var CodeMirror = true;",
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
    var numberOfErrors = [];

    languages.forEach(function(language, languageIndex) {
      var errorCounter = {
        language: language,
        numberOfErrors: 0
      };

      CodeMirror.runMode(valueString, language, function(currentString, style){
        if (style && -1 !== style.indexOf("error")) {
          errorCounter.numberOfErrors++;
        }
        console.log("language=", language, "currentString", currentString, " style=", style);
      }.bind(this));

      numberOfErrors[languageIndex] = errorCounter;
      console.log("language", errorCounter);
    }, this)

    this._detectModeTimeout = null;
  }
});

module.exports = WhatLang;
