// content-scripts.js

// let us know the script is running
console.log("Web Extension Test up and running!")

// Listens to incoming messages
chrome.runtime.onMessage.addListener(async function (req, sender, res) {

  if (req.type === "popup") {

    let reqInput = req.message
    let inputElements = document.querySelectorAll(reqInput)
    console.log(req.message)
    console.log(inputElements)

    inputElements.forEach(element => {
      console.log(element)
    })
  }
  else if (req.type === "popup-parse-iframe") {

    let iframe = document.querySelectorAll("iframe")

    iframe.forEach(e => {
      this.getCheckboxOptions(e.contentWindow.document.querySelectorAll('input[type=checkbox]'))
      this.getRadioOptions(e.contentWindow.document.querySelectorAll('input[type=radio]'))
      this.getRangeOptions(e.contentWindow.document.querySelectorAll('input[type=range]'))
      this.getSelectOptions(e.contentWindow.document.querySelectorAll('select'))
      this.getFileOptions(e.contentWindow.document.querySelectorAll('input[type=file]'))
      this.getTimeOptions(e.contentWindow.document.querySelectorAll('input[type=time]'))
      this.getWeekOptions(e.contentWindow.document.querySelectorAll('input[type=week]'))
      this.getMonthOptions(e.contentWindow.document.querySelectorAll('input[type=month]'))
      this.getDateOptions(e.contentWindow.document.querySelectorAll("input[type=date]"))
      this.getDatetimelocalOptions(e.contentWindow.document.querySelectorAll("input[type=datetime-local"))
      this.getNumberOptions(e.contentWindow.document.querySelectorAll('input[type=number]'))
      this.getColorOptions(e.contentWindow.document.querySelectorAll("input[type=color]"))
    })

  }
  else if (req.cmd === "createContextMenu") {
    // Clear the storage first
    chrome.storage.local.remove(["test"],function(){
      var error = chrome.runtime.lastError;
         if (error) {
             console.error(error);
         }
     })

    await parse()
    .then(async() => {
      // Send a message to background.js to create reports.html
      chrome.runtime.sendMessage({
        cmd: "createReportsPage",
      })
    })
    .catch((err) => { console.log(err); })

  }
  else {
    // console.log("This message only shows on the webpage console, message: " + req.message);
    res("hello from content scripts")
  }

  // asynchronous response
  return true
})


// Problem: the getOptions are not asynchronous, which is why a timer is needed
async function parse() {
  // Gets a list of text on the current tab
  let text_list = getTextList();
    
  // Checkbox options
  await this.getCheckboxOptions(document.querySelectorAll("input[type=checkbox]"));

  // Radio options
  await this.getRadioOptions(document.querySelectorAll("input[type=radio]"), text_list);

  // Input options
  await this.getRangeOptions(document.querySelectorAll("input[type=range]"));

  // Select options
  await this.getSelectOptions(document.querySelectorAll("select"));

  // Color options
  await this.getColorOptions(document.querySelectorAll("input[type=color]"));

  // Date options
  await this.getDateOptions(document.querySelectorAll("input[type=date]"));

  // Datetime-local options
  await this.getDatetimelocalOptions(document.querySelectorAll("input[type=datetime-local"));

  // Month options
  await this.getMonthOptions(document.querySelectorAll("input[type=month]"));

  // Number options
  await this.getNumberOptions(document.querySelectorAll("input[type=number]"));

  // Time options
  await this.getTimeOptions(document.querySelectorAll("input[type=time]"));

  // Week options
  await this.getWeekOptions(document.querySelectorAll("input[type=week]"));

  return new Promise((resolve, reject) => {
    resolve("success")
  })
} 

