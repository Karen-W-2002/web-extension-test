// content-scripts.js

// let us know the script is running
console.log("Web Extension Test up and running!")

// Listens to incoming messages
chrome.runtime.onMessage.addListener(function (req, sender, res) {

  if (req.type === "popup") {

    let reqInput = req.message
    let inputElements = document.querySelectorAll(reqInput)
    console.log(req.message)
    console.log(inputElements)

    inputElements.forEach(element => {
      console.log(element)
    })
  }
  else if (req.type === "popup-parse") {

    // this.getCheckboxOptions(document.querySelectorAll("input[type=checkbox]"))
    // this.getRadioOptions(document.querySelectorAll("input[type=radio]"))
    // this.getRangeOptions(document.querySelectorAll("input[type=range]"))
    // this.getSelectOptions(document.querySelectorAll("select"))
    // this.getFileOptions(document.querySelectorAll("input[type=file]"))
    // this.getTimeOptions(document.querySelectorAll("input[type=time]"))
    // this.getWeekOptions(document.querySelectorAll("input[type=week]"))
    // this.getMonthOptions(document.querySelectorAll("input[type=month]"))
    // this.getDateOptions(document.querySelectorAll("input[type=date]"))
    // this.getDatetimelocalOptions(document.querySelectorAll("input[type=datetime-local"))
    // this.getNumberOptions(document.querySelectorAll("input[type=number]"))
    // this.getColorOptions(document.querySelectorAll("input[type=color]"))
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
    let report_string = ""
    let temp = ""

    temp =  this.getCheckboxOptions(document.querySelectorAll("input[type=checkbox]"))
    if(temp !== undefined)
      report_string += temp

    temp = this.getRadioOptions(document.querySelectorAll("input[type=radio]"))
    if(temp !== undefined)
      report_string += temp

    temp = this.getRangeOptions(document.querySelectorAll("input[type=range]"))
    if(temp !== undefined)
      report_string += temp

    temp = this.getSelectOptions(document.querySelectorAll("select"))
    if(temp !== undefined)
      report_string += temp

    temp = this.getTimeOptions(document.querySelectorAll("input[type=time]"))
    if(temp !== undefined)
      report_string += temp

    temp = this.getWeekOptions(document.querySelectorAll("input[type=week]"))
    if(temp !== undefined)
      report_string += temp

    temp = this.getMonthOptions(document.querySelectorAll("input[type=month]"))
    if(temp !== undefined)
      report_string += temp

    temp = this.getDateOptions(document.querySelectorAll("input[type=date]"))
    if(temp !== undefined)
    report_string += temp

    temp = this.getDatetimelocalOptions(document.querySelectorAll("input[type=datetime-local"))
    if(temp !== undefined)
    report_string += temp

    temp = this.getNumberOptions(document.querySelectorAll("input[type=number]"))
    if(temp !== undefined)
      report_string += temp

    temp = this.getColorOptions(document.querySelectorAll("input[type=color]"))
    if(temp !== undefined)
      report_string += temp
    
    // Create new tab: reports.html
    chrome.runtime.sendMessage({
      cmd: "createReportsPage",
      results: report_string
    })
  }
  else {

    // console.log("This message only shows on the webpage console, message: " + req.message);
    res("hello from content scripts")
  }

  // asynchronous response
  return true
})