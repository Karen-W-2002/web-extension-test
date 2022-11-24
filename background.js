// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("background.js running");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

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

// Listens to incoming messages
chrome.runtime.onMessage.addListener(function (req, sender, res) {
  // Creates a click notification
  if (req.cmd === "notification") {
    chrome.notifications.create('', req.options);
    console.log("chrome notif created")
  }
  else if (req.cmd === "addContextMenus") {
    // Removes possibility of duplicate
    chrome.contextMenus.removeAll()

    // Creates a menu
    chrome.contextMenus.create({
      title: "Web Test",
      contexts: ["all"],
      id: "WebTest"
    })

    chrome.contextMenus.onClicked.addListener(menu => {
      // FIXME: creates multiple reports pages.... even when the tab is not active????
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          cmd: "createContextMenu"
        })
      })
    })
  }
  // Creates reports.html
  else if (req.cmd === "createReportsPage") {
    chrome.storage.local.set({ foo: req.results }, function () {
      // Storage is updated, create the tab
      chrome.tabs.create({ url: "reports/reports.html" });
    });
  }
})
