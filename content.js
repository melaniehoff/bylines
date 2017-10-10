// This is the content script for the extension
console.log("-=-=-  BiLines is running!  -=-=-");

$( document ).ready(function() {


  chrome.runtime.onMessage.addListener(receiver);

  // Handle the message
  function receiver(request, sender, sendResponse) {
    console.log("message: " + request.message);
    // Now if the message matches "browser action"
    if (request.message === "paywall") {
      payWall();

      // // Send a message back!
      // chrome.runtime.sendMessage({ "message": "thank you" });
    }
  }


function payWall(){

  chrome.storage.local.get("menCount", function(data) {
    if(typeof data.menCount == "undefined") {
        // That's kind of bad
    } else {
        console.log("You've read " + data.menCount + " articles by men.");
        alert("You've read " + data.menCount + " articles by men.");
    }
});
}








//doc ready closer
});
