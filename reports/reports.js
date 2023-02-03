// reports.js

chrome.storage.local.get(["report_string"], function (data) {
  let reportHTML = document.getElementById('parse-results')
  reportHTML.innerHTML = data.report_string
})