// results.js

// document.body.style.backgroundColor = 'green'

chrome.storage.local.get("foo", function (data) {
  let resultHTML = document.getElementById('parse-results')
  resultHTML.innerHTML = data.foo
})