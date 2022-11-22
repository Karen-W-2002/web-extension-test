// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("background.js running");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  // Is there a cleaner way of doing this?
  if (tab.url && changeInfo.status === "complete") {

    console.log(changeInfo.status);
    console.log(tab.url);

    // Chrome as of 61 explicitly forbids content scripts on its default new tab page
    if (tab.url != "chrome://newtab/") {
      chrome.tabs.sendMessage(tabId, { message: "hello" }, function (response) {
        console.log("response from content-scripts: " + response);
      });
    }
  }

});

// Listens to incoming messages
chrome.runtime.onMessage.addListener(function (request, sender, response) {
  console.log("message recieved");

  // Creates a click notification
  if (request.type === "notification") {
    chrome.notifications.create('', request.options);
    console.log("chrome notif created")
  }
})