var assert = require("chai").assert;
var LanguageDetector = require("../src/whatlang/language_detector");

describe("LanguageDetector", function(){
  it("Detects javascript correctly", function(){
    var possibleLanguages = LanguageDetector.getSortedPossibleLanguagesArray("function() {var hello = world; return hello;}");
    assert.equal(possibleLanguages[0].language, "javascript");
  });
});
