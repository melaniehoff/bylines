// This is the background script for the extension
var articles_by_men = 0;
var articles_by_women = 0;
var articleCount = 0;


// Listening for messages
chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  if (request.message === "man author") {
    articles_by_men += 1;
    console.log("articles_by_men: " + articles_by_men);
  }

  if (request.message === "woman author") {
    articles_by_women += 1;
    console.log("articles_by_women: " + articles_by_women);
  }
  if (articles_by_men >= 3) {
    console.log("SENDING PAYWALL");
    chrome.tabs.sendMessage(tab.id, {"message": "paywall"});

  }
}

chrome.runtime.onMessage.addListener(receiver2);

function receiver2(request, sender, sendResponse) {
  if (request.message === "article") {
    articleCount += 1;
    console.log("current article count: " + articleCount);
  }

}


// A listener for when the user clicks on the extension button
chrome.browserAction.onClicked.addListener(buttonClicked);

// Handle that click
function buttonClicked(tab) {
  // Send a message to the active tab
  console.log("button clicked!");

  // Send a message to the tab that is open when button was clicked
  chrome.tabs.sendMessage(tab.id, {"message": "browser action"});
}
