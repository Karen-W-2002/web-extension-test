// reports.js

chrome.storage.local.get(["report_string", "imgSrc", "test"], function (data) {
  // Get the ID of where the table goes in reports.html
  let reportHTML = document.getElementById('parse-results');

  console.log(data.test)
  for(let i=0; i<data.test.length; i++) {
    reportHTML.innerHTML += data.test[i];
  }
})

