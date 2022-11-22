// content-scripts.js

// TODO: days in dates are a bit funky because edge case for min max same month and year... doesn't subtract the days

// Listens to incoming messages
chrome.runtime.onMessage.addListener(function (req, sender, response) {

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

    {
      // TESTING AREA
      labels = document.querySelectorAll('div[style*="display:none"]')
      labels.forEach(el => {
        el.style.display = "initial"
      })

    }

    // List that has all TEXT positions
    let text_list = []
    text_list = getTextList()


    this.getCheckboxOptions(document.querySelectorAll("input[type=checkbox]"), text_list)
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
  else {

    // console.log("This message only shows on the webpage console, message: " + req.message);
    response("hello from content scripts");
  }

  // asynchronous response
  return true;
});

// Mouse click event listener
document.addEventListener('click', (event) => {

  // Sends a message to background to create a notification
  chrome.runtime.sendMessage('', {
    type: "notification",
    options: {
      type: "basic",
      title: "click notification",
      message: "PosX: " + event.clientX + " PosY: " + event.clientY + "\n" + event.target,
      iconUrl: "assets/apple.png",
    }
  })
})