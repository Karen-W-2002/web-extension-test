// background.js

// On installed listener
chrome.runtime.onInstalled.addListener(function () {
  console.log("background.js running")
  // Removes posibility of duplicate context menus before creating a new one
  chrome.contextMenus.removeAll()

  // Creates a menu
  chrome.contextMenus.create({
    title: "Web Test",
    contexts: ["all"],
    id: "WebTest",
  })
})

// On updated listener
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  // Is there a cleaner way of doing this?
  if (tab.url && changeInfo.status === "complete") {

    console.log(changeInfo.status)
    console.log(tab.url)

    // Chrome as of 61 explicitly forbids content scripts on its default new tab page
    if (tab.url != "chrome://newtab/") {
      chrome.tabs.sendMessage(tabId, { message: "hello" }, function (res) {
        console.log("response from content-scripts: " + res)
      })
    }
  }

})

// Listens to incoming messages from content scripts
chrome.runtime.onMessage.addListener(function (req, sender, res) {

  // Creates reports.html
  if (req.cmd === "createReportsPage") {
    console.log("creating reports page...")
    chrome.storage.sync.set({ report_string: req.results }, function () {
      // Storage is updated, create the tab
      chrome.tabs.create({ url: "reports/reports.html" });
    });
  }

  if(req.cmd === "screenshotTab") {
    chrome.tabs.captureVisibleTab((dataURL) => {
      // chrome.downloads.download({
      //   filename: "chrome.jpg",
      //   url: dataURL
      // });
      // Response to content script
      chrome.storage.sync.set({ url: dataURL });
      // res({ url: dataURL });
    });
  }

  // async response
  return true;
})

// Creates a listener for context menu clicks, then sends a message to content scripts to create a context menu
chrome.contextMenus.onClicked.addListener(function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      cmd: "createContextMenu"
    })
  })
})