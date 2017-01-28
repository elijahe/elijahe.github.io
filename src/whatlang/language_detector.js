var CodeMirror = require("codemirror");
require("codemirror/mode/meta");
require("codemirror/addon/runmode/runmode");

CodeMirror.modeInfo.forEach(function(modeInfo) {
  var mode = modeInfo.mode;
  if (mode && "null" !== mode) {
    require("codemirror/mode/" + mode + "/" + mode + ".js");
  }
});


module.exports = {
  getSortedPossibleLanguagesArray: function(valueString) {
    var analysisResultsArray = [];
    var sortedPossibleLanguages = [];

    CodeMirror.modeInfo.forEach(function(modeInfo) {
      var mode = modeInfo.mode;
      var analysisResults = {
        mode: mode,
        name: modeInfo.name,
        numberOfValidTokens: 0,
        numberOfErrors: 0
      };

      CodeMirror.runMode(valueString, mode, function(currentString, style){
        if (style) {
          if (-1 !== style.indexOf("error")) {
            analysisResults.numberOfErrors++;
          } else if (currentString && currentString.length > 1) {
            analysisResults.numberOfValidTokens++;
          }
        }
      });

      if (analysisResults.numberOfErrors > 0 || analysisResults.numberOfValidTokens > 0) {
        analysisResultsArray.push(analysisResults);
      }
    });

    sortedPossibleLanguages = analysisResultsArray.sort(function(a, b) {
      return b.numberOfValidTokens - a.numberOfValidTokens +
              a.numberOfErrors - b.numberOfErrors;
    });

    return sortedPossibleLanguages;
  }
};
