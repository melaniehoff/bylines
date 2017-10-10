// This is the background script for the extension
var articles-by-men = 0;
var articles-by-women = 0;
var articles-by-unsure = 0;
var articleCount = 0;

// Listening for messages
chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {

  if (request.message === "man author") {
    articles-by-men += 1;

    chrome.storage.local.set({menCount: total-articles-by-men});
    chrome.storage.local.set({menCount: articles-by-men});

    console.log("articles-by-men: " + articles-by-men);
  }

  if (request.message === "woman author") {
    articles-by-women += 1;
    console.log("articles-by-women: " + articles-by-women);
  }
  if (request.message === "unsure of gender author") {
    articles-by-unsure += 1;
    console.log("articles-by-unsure: " + articles-by-unsure);
  }

  if (articles-by-men >= 3) {
    console.log("SENDING PAYWALL");
    chrome.tabs.sendMessage(sender.tab.id, {"message": "paywall"});
    //resets here:
    articles-by-men = 0;
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
