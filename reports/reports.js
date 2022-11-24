// reports.js

// document.body.style.backgroundColor = 'green'

chrome.storage.local.get("foo", function (data) {
  let reportHTML = document.getElementById('parse-results')
  reportHTML.innerHTML = data.foo
})