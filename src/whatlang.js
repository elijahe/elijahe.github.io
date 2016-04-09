require("codemirror/lib/codemirror.css");
var CodeMirror = require("codemirror");
require("codemirror/addon/runmode/runmode");
var languages = ["css", "htmlmixed", "javascript"];
var modes = languages.map(function(language) {
  return require("codemirror/mode/" + language + "/" + language);
});

// var modes = modeDirectories.forEach(function(modeDir) {
//   console.log("modeDir=", modeDir);
// });

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

    this.editor.on("changes", this.onChange.bind(this));
  },
  onChange: function(editor, changeObj){
    if (this._detectModeTimeout) {
      window.clearTimeout(this._detectModeTimeout);
    }
    this._detectModeTimeout = window.setTimeout(this.detectMode.bind(this), 1000);
  },
  detectMode: function() {

    this._detectModeTimeout = null;
  }
});

module.exports = WhatLang;
