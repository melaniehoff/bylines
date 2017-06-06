// This is the content script for the extension
console.log("BiLines is running!");

$( document ).ready(function() {
    console.log( "ready!" );



    var elts = $(".byline");
    for (var i = 0; i < elts.length; i++) {
      elts[i].style['background-color'] = '#F0C';
    }

    var all = $(".byline").map(function() {
         return this.innerHTML;
    }).get();
    console.log(all.join());


///////////////////////////////////////////
///////////////////////////////////////////

     var keyVar = 'sZckQBUyhnkEpllCjF'

     $('a#title').genderApi({key: keyVar}).on('gender-found', function(e, result) {

       if (result.accuracy >= 60) {

         console.log('!!!!Melanie Gender found: ' + result.gender);

       }

     });



});















//TO RUN WITH BUTTON:
// Listen for messages
// chrome.runtime.onMessage.addListener(receiver);

// Handle the message
// function receiver(request, sender, sendResponse) {
//   // Now if the message matches "browser action"
//   if (request.message === "browser action") {
//     // Change the background color again
//     var elts = document.getElementsByTagName('p');
//     for (var i = 0; i < elts.length; i++) {
//       elts[i].style['background-color'] = '#F0C';
//     }
//     // Send a message back!
//     chrome.runtime.sendMessage({ "message": "thank you" });
//   }
// }
