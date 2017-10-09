var firstNames = [];
var fullNamesLength = 0;


var maleHomePageCount = 0;
var femaleHomePageCount = 0;
var unsureHomePageCount = 0;


$(document).ready(function() {

  if (document.location.href == "https://www.nytimes.com/" || document.location.href.startsWith("https://www.nytimes.com/?W")) {
    console.log("NYT Homepage");
    homePage();
  } else if (document.location.href.startsWith("https://www.nytimes.com/20")) {
    console.log("NYT Article");
    nytArticle();
  }

  //doc ready closer
});


function homePage() {
  console.log("_______ BYLINES : NYTIMES EDITION ______");

  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////

  //gets all nyt bylines by class
  function grabBylines() {
    var bylines = $(".byline");
    //highlights them
    for (var i = 0; i < bylines.length; i++) {
      bylines[i].style['background-color'] = '#99fff0';
    }
    //puts contents into array
    var all = bylines.map(function() {
      return this.innerHTML;
    }).get();

    return all;
  }


  function fullNamesFunction(returnedAllNames) {
    var fullNames = [];

    returnedAllNames.forEach(function(item, index, array) {
      fullNames.push(getFullNames(item));
    });
    //flatten getFullNames
    var merged = [].concat.apply([], fullNames);
    // console.log("sending this through getFirstNames vv");
    // console.log(merged);
    return merged;
  }

  function getFullNames(byline) {
    var timestampRegex = /<.*$/;
    var without_timestamp_by = byline.replace(timestampRegex, "").slice(3).slice(0, -1);


    var andExpr = / and /;
    if (without_timestamp_by.search(andExpr) == -1) {
      return [without_timestamp_by];
    } else {
      return without_timestamp_by.split(/, | and /);
    }

  }

  function getFirstNamesAndTally(fullNames) {
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    console.log("There are this many names: " + fullNames.length);
    fullNamesLength = fullNames.length;

    fullNames.forEach(function(item, index, array) {
      var oneFirstName = item.split(/ /)[0];
      genderApi(oneFirstName);

      console.log("&&&&&&&&&&&&&&&&&" + fullNames);
    });
  }

  ///////////////////////////////////////////
  ///////////////////////////////////////////


  function genderApi(oneFirstName) {
    $.get("https://gender-api.com/get?key=sZckQBUyhnkEpllCjF&name=" + oneFirstName, function(data, status) {
      console.log(">>>>>>>>>>>>API results for:  " + oneFirstName);
      // console.log(data['gender']);
      // console.log(data);
      if (data['accuracy'] <= 89) {
        console.log("Unsure of gender..............");
        unsureHomePageCount += 1;
        // console.log("unsureHomePageCount === " + unsureHomePageCount)
      } else {
        console.log(data['gender']);
        if (data['gender'] == "male") {
          maleHomePageCount += 1;
          // console.log("maleHomePageCount === " + maleHomePageCount)
        } else {
          femaleHomePageCount += 1;
          // console.log("femaleHomePageCount === " + femaleHomePageCount)
        }
      }
    });
  }

  function homepageTally() {
    var totalHomePageCount = (unsureHomePageCount + maleHomePageCount + femaleHomePageCount);
    // console.log("(((((((((((((((((((())))))))))))))))))))");
    //         console.log("(((((((((((((((((((())))))))))))))))))))");
    //                 console.log("(((((((((((((((((((())))))))))))))))))))");
    console.log(">>> Out of " + totalHomePageCount + " authors, " + maleHomePageCount + " are men and " + femaleHomePageCount + " are women.");
  }



  var returnedAllNames = grabBylines();
  var fullNamesList = fullNamesFunction(returnedAllNames);
  getFirstNamesAndTally(fullNamesList);
}





/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////      /////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////      /////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////      /////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////      /////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////      /////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
function nytArticle() {


  $(document).ready(function() {
    console.log("_______ BILINES : NYTIMES ARTICLE ______");
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////


    grabBylines();
    chrome.runtime.sendMessage({
      "message": "article"
    });

    //gets all nyt bylines by class
    function grabBylines() {
      var bylines = $(".byline-author");
      //highlights them
      for (var i = 0; i < bylines.length; i++) {
        bylines[i].style['background-color'] = '#99fff0';
      }

      //puts contents into array
      var all = bylines.map(function() {
        return this.innerHTML;
      }).get();

      getFirstNames(all);
    }

    function getFirstNames(fullNames) {
      console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
      console.log("There are this many names: " + fullNames.length);
      fullNamesLength = fullNames.length;

      fullNames.forEach(function(item, index, array) {
        var oneFirstName = item.split(/ /)[0];
        genderApi(oneFirstName);
      });
    }

    ///////////////////////////////////////////
    ///////////////////////////////////////////
    // https://gender-api.com/get?key=sZckQBUyhnkEpllCjF&name=Anna;Jack;Stephen


    function genderApi(oneFirstName) {
      $.get("https://gender-api.com/get?key=sZckQBUyhnkEpllCjF&name=" + oneFirstName, function(data, status) {
        console.log(">>>>>>>>>>>>API results for:  " + oneFirstName);
        // console.log(data['gender']);
        // console.log(data);
        if (data['accuracy'] <= 89) {
          console.log("Unsure of gender..............");
        } else {
          console.log(data['gender']);
          if (data['gender'] == "male") {
            chrome.runtime.sendMessage({
              "message": "man author"
            });
          } else {
            chrome.runtime.sendMessage({
              "message": "woman author"
            });
          }
        }
      });

    }



    //doc ready closer
  });



  //nytArticle closer
}
