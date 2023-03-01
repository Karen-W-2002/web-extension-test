// input-options.js

function sendMessage(request, col1, col2, col3) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      cmd: "screenshotTab",
    }, async function(response) {
      // TODO: response for success and failure
      await setLocalStorage(response.imgSrc, col1, col2, col3);
      resolve("success");
    });
  })
}

function setLocalStorage(response, col1, col2, col3) {
  return new Promise((resolve, reject) => {
    // Retrieve the store value, defaulting to an empty array
    chrome.storage.local.get({'test': []}, function (data) {
      let arr = new Array;
      if(data.test.length !== 0)
        arr = data.test;
      // arr.push(`<tr><td class=\"column1\"><img src=${response} alt="" width="100" height="100"></img></td><td class=\"column2\">${col2}</td><td class=\"column3\">${col3}</td></tr>`);
      arr.push(`<tr><td class=\"column1\">${col1}</td><td class=\"column2\">${col2}</td><td class=\"column3\">${col3}</td></tr>`)
      
      chrome.storage.local.set({'test': arr}, function () {
        resolve("success");
      });
    })
  })
}

// Returns a Promise that resolves after milliseconds
const timer = (ms) => new Promise(res => setTimeout(res, ms))

// TODO: Disabled checkboxes shouldn't be displayed?
async function getCheckboxOptions(pageElement) {
  let checkboxElements = pageElement

  if (checkboxElements.length === 0) return

  // For each of the checkbox element
  for(const element of checkboxElements)
  {
    if(!isVisible(element)) continue;

    let name = "Checkbox";
    let xpath = getXPath(element);
    let opts = "checked, unchecked";
    await sendMessage(null, name, xpath, opts);

    // Solves MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND (2 captures per second)
    // await timer(500);
  }
}

// FIXME: same name different forms are in different groups 
async function getRadioOptions(pageElement, text_list) {
  let radioElements = pageElement
  let radioHashmap = {}
  let radioOptions = new Array

  if (radioElements.length === 0) return
  for(const element of radioElements)
  {
    if(!isVisible(element)) continue;

    if (!radioHashmap[element.name]) {
      radioOptions[element.name] = getNearestText(element, text_list)
      radioHashmap[element.name] = 1
    } else {
      radioOptions[element.name] += getNearestText(element, text_list)
      radioHashmap[element.name]++
    }
  }

  // Loops thru each radio group
  for (const key in radioHashmap) {
    let name = "Radio";
    let xpath = "name=" + key;
    let opts = radioOptions[key];

    await sendMessage(null, name, xpath, opts);
  }
}

// TODO: add isVisible to others
// TODO: days in dates are a bit funky because edge case for min max same month and year... doesn't subtract the days
async function getRangeOptions(pageElement) {
  let rangeElements = pageElement

  if (rangeElements.length === 0) return

  for(const element of rangeElements)
  {
    if(!isVisible(element)) continue;

    // Set default values
    let min = 0;
    let max = 100;
    let step = 1;

    // Check if they set min,max,step
    // If not, use the previous default values
    if (element.min !== "") min = element.min;
    if (element.max !== "") max = element.max;
    if (element.step !== "") step = element.step;
    
    // parseInt ensures the number will be an integer, not a string
    let min_next = parseInt(min) + parseInt(step)
    let max_prev = parseInt(max) - parseInt(step)


    let name = "Range";
    let xpath = getXPath(element)
    // Using 4 options as total options, the boundary values
    let opts = min + ", " + min_next + ", " + max_prev + ", " + max

    await sendMessage(null, name, xpath, opts);
  }
}

async function getSelectOptions(pageElement) {
  let selectOptionElements = pageElement

  if (selectOptionElements.length === 0) return

  for(const element of selectOptionElements)
  {
    if(!isVisible(element)) continue;

    let opts = "";
    // Gets the options for the select input
    let optionsElements = element.querySelectorAll('option');

    optionsElements.forEach(opt => {
      // Checks if option is disabled, disabled option will not be included
      if(!opt.disabled)
        opts += `${opt.innerHTML}, `;
    })

    let name = "Select";
    let xpath = getXPath(element);
    await sendMessage(null, name, xpath, opts);
  }

}

async function getColorOptions(pageElement) {
  let colorElements = pageElement

  if (colorElements.length === 0) return

  for(const element of colorElements)
  {
    if(!isVisible(element)) continue;

    let name = "Color";
    let xpath = getXPath(element);
    // Boundary values
    let opts = "#000000, #FFFFFF"

    await sendMessage(null, name, xpath, opts);
  }
}

async function getDateOptions(pageElement) {
  let dateElements = pageElement

  if (dateElements.length === 0) return

  for(const element of dateElements)
  {
    if(!isVisible(element)) continue;

    // Default values
    let min = "1970-01-01";
    let max = "2022-12-31";

    // Checks for default values
    if (element.min !== "") min = element.min;
    if (element.max !== "") max = element.max;

    let name = "Date"
    let xpath = getXPath(element)
    let opts = min + ", " + max

    await sendMessage(null, name, xpath, opts);
  }
}

async function getDatetimelocalOptions(pageElement) {
  let dateElements = pageElement

  if (dateElements.length === 0) return

  for(const element of dateElements)
  {
    if(!isVisible(element)) continue;

    // Default values
    let min = "1970-01-01-00:00";
    let max = "2022-12-31-23:59";
    let step = "60";

    // Checks for default values
    if (element.min !== "") min = element.min;
    if (element.max !== "") max = element.max;
    if (element.step !== "") step = element.step;

    let name = "Datetime-local";
    let xpath = getXPath(element);
    let opts = min + ", " + max;

    await sendMessage(null, name, xpath, opts);
  }
}

async function getMonthOptions(pageElement) {
  let monthElements = pageElement;

  if (monthElements.length === 0) return;

  for(const element of monthElements)
  {
    if(!isVisible(element)) continue;

    // Default values
    let min = "1970-01";
    let max = "2022-12";

    // Check for default values
    if (element.min !== "") min = element.min;
    if (element.max !== "") max = element.max;

    let name = "Month";
    let xpath = getXPath(element);
    let opts = min + ", " + max

    await sendMessage(null, name, xpath, opts);
  }
}

async function getNumberOptions(pageElement) {
  let numberElements = pageElement

  if (numberElements.length === 0) return

  for(const element of numberElements)
  {
    if(!isVisible(element)) continue;
    
    // Default values
    let min = element.min;
    let max = element.max;
    let step = 1;

    // Check for default values
    if (element.step !== "") step = element.step;

    let name = "Number";
    let xpath = getXPath(element);
    let opts = "";

    // Check for min,max default value, if it doesn't exist, then the output will be "infinite"
    if (min === "" || max === "") {
      // Infinite options
      opts = "Infinite";
    } else {
      let min_next = parseInt(min) + parseInt(step);
      let max_prev = parseInt(max) - parseInt(step);

      // 4 options, boundary values
      opts = min + ", " + min_next + ", " + max_prev + ", " + max;
    }
    await sendMessage(null, name, xpath, opts);
  }
}

async function getTimeOptions(pageElement) {
  let timeElements = pageElement

  if (timeElements.length === 0) return

  for(const element of timeElements)
  {
    if(!isVisible(element)) continue;

    // Default values
    let min = "00:00";
    let max = "23:59";
    let step = "60";

    // Checks for default values
    if (element.min !== "") min = element.min;
    if (element.max !== "") max = element.max;
    if (element.step !== "") step = element.step;
    
    // let opts = min + ", " + min_next + ", " + max_prev + ", " + max
    let name = "Time";
    let xpath = getXPath(element);
    // 2 options, boundary values
    let opts = min + ", " + max;

    await sendMessage(null, name, xpath, opts);
  }
}

async function getWeekOptions(pageElement) {
  let weekElements = pageElement;

  if (weekElements.length === 0) return;

  for(const element of weekElements) 
  {
    if(!isVisible(element)) continue;

    // Default values
    let min = "1970-W1"
    let max = "2022-W52"

    // Check for default values
    if (element.min !== "") min = element.min;
    if (element.max !== "") max = element.max;

    let name = "Week";
    let xpath = getXPath(element);
    let opts = min + ", " + max;

    await sendMessage(null, name, xpath, opts);
  }
}