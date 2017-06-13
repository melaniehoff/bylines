// This is the content script for the extension
console.log("-=-=-  BiLines is running!  -=-=-");

$( document ).ready(function() {

  chrome.runtime.onMessage.addListener(receiver);

  // Handle the message
  function receiver(request, sender, sendResponse) {
    // Now if the message matches "browser action"
    if (request.message === "paywall") {
      // Change the background color again
      alert("This is a PAYWALL!!")
      // // Send a message back!
      // chrome.runtime.sendMessage({ "message": "thank you" });
    }
  }









//doc ready closer
});
