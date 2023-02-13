// reports.js

chrome.storage.sync.get(["report_string"], function (data) {
  let reportHTML = document.getElementById('parse-results')
  reportHTML.innerHTML = data.report_string
})