var CodeMirror = require("codemirror");
require("codemirror/mode/meta");
require("codemirror/addon/runmode/runmode");

CodeMirror.modeInfo.forEach(function(modeInfo) {
  var language = modeInfo.mode;
  if (language && "null" !== language) {
    require("codemirror/mode/" + language + "/" + language);
  }
});


module.exports = {
  getSortedPossibleLanguagesArray: function(valueString) {
    var analysisResultsArray = [];
    var sortedPossibleLanguages = [];

    CodeMirror.modeInfo.forEach(function(modeInfo) {
      var language = modeInfo.mode;
      var analysisResults = {
        language: language,
        numberOfValidTokens: 0,
        numberOfErrors: 0
      };

      if (language && "null" !== language) {
        CodeMirror.runMode(valueString, language, function(currentString, style){
          if (style) {
            if (-1 !== style.indexOf("error")) {
              analysisResults.numberOfErrors++;
            } else if (currentString) {
              analysisResults.numberOfValidTokens++;
            }
          }
          console.log("language=", language, "currentString", currentString, " style=", style);
        });
        analysisResultsArray.push(analysisResults);

        console.log("language", analysisResults);
      }
    });

    sortedPossibleLanguages = analysisResultsArray.filter(function(analysisResults) {
      return analysisResults.numberOfValidTokens &&
              !analysisResults.numberOfErrors;
    });

    return sortedPossibleLanguages;
  }
};
