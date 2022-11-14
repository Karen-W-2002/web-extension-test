document.querySelector('#go-to-options').addEventListener('click', function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL('options.html'))
  }
})

document.querySelector('#search').addEventListener('click', function () {
  let input = document.querySelector('#search-input').value

  if (document.querySelector('#search-input').value != null) {
    // sends message to content scripts
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "popup",
        message: input,
      }, function (response) {
        console.log(response)
      })
    })
  }
})

document.querySelector('#parse').addEventListener('click', function () {
  // sends message to content scripts
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "popup-parse",
    }, function (response) {
      console.log(response)
    })
  })
})

document.querySelector('#parse-iframe').addEventListener('click', function () {
  // sends message to content scripts
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "popup-parse-iframe",
    }, function (response) {
      console.log(response)
    })
  })
})