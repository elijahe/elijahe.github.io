var assert = require("chai").assert;
var LanguageDetector = require("../src/whatlang/language_detector");

describe("LanguageDetector", function(){
  it("Detects javascript correctly", function(){
    var possibleLanguages = LanguageDetector.getSortedPossibleLanguagesArray(
      "var array = [1, \"2\", {}]; \n" +
      "function() {var hello = world; return hello;}.bind(this); \n" +
      "var randomObject = {prop1: true, prop_2: 'false'};"
    );
    possibleLanguages.some(function(languageSpec, index) {
      if (languageSpec.name === "JavaScript") {
        console.log(index);
        return true;
      }
      return false;
    });
    assert.equal(possibleLanguages[0].name, "JavaScript");
  });
});
