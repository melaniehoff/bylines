
$( document ).ready(function() {
console.log( "_______ BILINES : NYTIMES EDITION ______" );
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

var firstNames = [];
var fullNames = [];

grabBylines();

//gets all nyt bylines by class
function grabBylines(){
    var bylines = $(".byline");
    //highlights them
    for (var i = 0; i < bylines.length; i++) {
      bylines[i].style['background-color'] = '#99fff0';
    }
    //puts contents into array
    var all = bylines.map(function() {
         return this.innerHTML;
    }).get();

    fullNamesFunction(all);
}


function fullNamesFunction(all) {
    console.log("XXXXXXXXXXXXXXXXXXX");
    for (i = 0; i < all.length; i++) {
        //for everything in all, clean of timestamp and And and By using getFullNames
        //push each cleaned name into fullNames
        fullNames.push(getFullNames(all[i]));
    }
    //flatten getFullNames
    var merged = [].concat.apply([], fullNames);
    console.log("sending this through getFirstNames vv");
    console.log(merged);
    getFirstNames(merged);
}

function getFullNames(byline) {
  var timestampRegex = /<.*$/;
  var without_timestamp_by = byline.replace(timestampRegex, "").slice(3).slice(0,-1);


 var andExpr = / and /;
 if (without_timestamp_by.search(andExpr) == -1) {
   return [without_timestamp_by];
 } else {
   return without_timestamp_by.split(/, | and /);
 }

}

function getFirstNames(fullNames) {
    console.log("_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_");
    console.log("There are this many names: " + fullNames.length);
    for (i = 0; i < fullNames.length; i++) {
        // console.log(i);
        // console.log(fullNames[i]);

        //split at the space and push the first item into firstNames
        var oneFirstName = fullNames[i].split(/ /)[0];
    // --for calling multiple names at once(not good);
        // firstNames.push(oneFirstName);
        genderApi(oneFirstName);
    }
// --for calling multiple names at once(not good);
    // multipleGenderApi(firstNames);
}

///////////////////////////////////////////
///////////////////////////////////////////
// https://gender-api.com/get?key=sZckQBUyhnkEpllCjF&name=Anna;Jack;Stephen


function genderApi(oneFirstName){

    $.get("https://gender-api.com/get?key=sZckQBUyhnkEpllCjF&name=" + oneFirstName, function( data, status ) {
        console.log(">>>>>>>>>>>>API results for:  "+ oneFirstName);
        console.log(data['gender']);
    });
}

// for calling multiple names at once(not good);
function multipleGenderApi(firstNames){
    console.log("______________genderApi____________");
    console.log("______________firstNames_______vv_____");
    console.log(firstNames);
    var firstNamesString = firstNames.join(";");
    console.log("______________firstNamesString_______vv_____");
    console.log(firstNamesString);
    $.get("https://gender-api.com/get?key=sZckQBUyhnkEpllCjF&name=" + firstNamesString, function( data, status ) {
      console.log("______________API RESULTS_______vv_____");
      console.log( data );
    });
}
















//doc ready closer
});