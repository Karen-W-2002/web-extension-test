// input-options.js

// TODO: add isVisible to others
// TODO: days in dates are a bit funky because edge case for min max same month and year... doesn't subtract the days
function getCheckboxOptions(pageElement) {
  let checkboxElements = pageElement
  let output_string = ""

  if (checkboxElements.length === 0) return

  // For each of the checkbox element
  checkboxElements.forEach(element => {
    if (isVisible(element)) {
      console.log(element)
      let xpath = getXPath(element)
      output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Checkbox</td><td class=\"column3\">2</td></tr>`
    }
  })

  return output_string
}

// FIXME: same name different forms are in different groups 
// TODO: Disabled checkboxes shouldn't be displayed?
function getRadioOptions(pageElement) {
  let radioElements = pageElement
  let output_string = ""
  let radioHashmap = {}
  let radioOptions = new Array

  if (radioElements.length === 0) return

  radioElements.forEach(element => {
    if(isVisible)
    {
      console.log(element)
      
      if (!radioHashmap[element.name]) {
        radioOptions[element.name] = ""
        radioHashmap[element.name] = 1
      } else {
        radioHashmap[element.name]++ 
      }
    }
  })

  // Logs the number of radio groups
  // let numRadioGroups = Object.keys(radioHashmap).length

  // Loops thru each radio group
  for (const key in radioHashmap) {
    let xpath = "name=" + key
    output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Radio</td><td class=\"column3\">${radioHashmap[key]}</td></tr>`
  }
  
  return output_string
}

function getRangeOptions(pageElement) {
  let rangeElements = pageElement
  let output_string = ""

  if (rangeElements.length === 0) return

  rangeElements.forEach(element => {
    if(isVisible(element))
    {
      console.log(element)
      let xpath = getXPath(element)
      // This is the default values for browser if they didn't set a value
      let min = 0
      let max = 100
      let step = 1

      // Checks for default values
      if (element.min !== "") {
        min = element.min
      }

      if (element.max !== "") {
        max = element.max
      }

      if (element.step !== "") {
        step = element.step
      }

      // Find possible options
      // +1 because default value
      let possible_sum = Math.floor(Math.abs(max - min) / step) + 1

      output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Range</td><td class=\"column3\">${possible_sum}</td></tr>`
    }
  })

  return output_string
}

// TODO: Some options are data-placeholders (don't count)
function getSelectOptions(pageElement) {
  let selectOptionElements = pageElement
  let output_string = ""

  if (selectOptionElements.length === 0) return

  selectOptionElements.forEach(element => {
    if(isVisible(element))
    {
      console.log(element)
      let xpath = getXPath(element)
      let optionsElements = element.querySelectorAll('option')

      // TODO: NEAREST TEXT??? when there is no data placeholder else just use the data placeholder
      let num_options = 0
      optionsElements.forEach(opt => {
        num_options++
      })
      // output_string += "<br/>"
      output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Select</td><td class=\"column3\">${num_options}</td></tr>`
    }
  })

  return output_string
}

function getColorOptions(pageElement) {
  let colorElements = pageElement
  let output_string = ""

  if (colorElements.length === 0) return

  colorElements.forEach(element => {
    console.log(element)
    let xpath = getXPath(element)
    // red: 256, green: 256, blue: 256
    output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Color</td><td class=\"column3\">${256},${256},${256}</td></tr>`
  })

  return output_string
}

function getDateOptions(pageElement) {
  let dateElements = pageElement
  let output_string = ""

  if (dateElements.length === 0) return

  dateElements.forEach(element => {
    console.log(element)
    let xpath = getXPath(element)

    // default values
    let min = "1970-01-01"
    let max = "2022-12-31"

    // Checks for default values
    if (element.min !== "") {
      min = element.min
    }

    if (element.max !== "") {
      max = element.max
    }

    let year_min = parseInt(min.split("-")[0])
    let year_max = parseInt(max.split("-")[0])
    let month_min = parseInt(min.split("-")[1])
    let month_max = parseInt(max.split("-")[1])
    let day_min = parseInt(min.split("-")[2])
    let day_max = parseInt(max.split("-")[2])

    // +1 because the maximum is included
    let total_years = year_max - year_min + 1
    let total_months = month_max - month_min + 1

    // possible options of DD: 31 days because maximum days in some months
    let possible_sum1 = 31

    // possible options of MM/YY
    let possible_sum2 = month_max + (13 - month_min) + ((total_years - 2) * 12)

    output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Date</td><td class=\"column3\">${possible_sum1},${possible_sum2}</td></tr>`
  })

  return output_string
}

function getDatetimelocalOptions(pageElement) {
  let dateElements = pageElement
  let output_string = ""

  if (dateElements.length === 0) return

  dateElements.forEach(element => {
    console.log(element)
    let xpath = getXPath(element)

    let min = "1970-01-01-00:00"
    let max = "2022-12-31-23:59"
    let step = "60"

    // Checks for default values
    if (element.min !== "") {
      min = element.min
    }

    if (element.max !== "") {
      max = element.max
    }

    if (element.step !== "") {
      step = element.step
    }

    let year_min = parseInt(min.split("-")[0])
    let year_max = parseInt(max.split("-")[0])
    let month_min = parseInt(min.split("-")[1])
    let month_max = parseInt(max.split("-")[1])
    let day_min = parseInt(min.split("-")[2])
    let day_max = parseInt(max.split("-")[2])

    let time_min = min.split("-")[3]
    let time_max = max.split("-")[3]
    let hh_min = parseInt(time_min.split(":")[0])
    let hh_max = parseInt(time_max.split(":")[0])
    let mm_min = parseInt(time_min.split(":")[1])
    let mm_max = parseInt(time_max.split(":")[1])

    let step_in_minutes = step / 60

    // No +1 because the maximum is not included
    let hours_to_minutes = (hh_max - hh_min) * 60
    let minutes = mm_max - mm_min

    // +1 because the maximum is included
    let total_years = year_max - year_min + 1
    let total_months = month_max - month_min + 1

    // options of DD: 31 days because maximum days in a month
    let possible_sum1 = 31
    // options of MM/YY
    let possible_sum2 = month_max + (12 - month_min) + ((total_years - 2) * 12) + 1
    // options of HH/MM
    let possible_sum3 = ((hours_to_minutes + minutes) / step_in_minutes) + 1

    output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Datetime-local</td><td class=\"column3\">${possible_sum1},${possible_sum2},${possible_sum3}</td></tr>`
  })

  return output_string
}

function getFileOptions(pageElement) {
  let fileElements = pageElement
  let output_string = ""

  if (fileElements.length === 0) return

  fileElements.forEach(element => {
    console.log(element)
    let xpath = getXPath(element)

    if (element.multiple) {
      output_string += "File Input" + NEWLINE
      output_string += "options: 3 * accepted files" + NEWLINE + NEWLINE
    } else {
      output_string += "File Input" + NEWLINE
      output_string += "options: 2 * accepted files" + NEWLINE + NEWLINE
    }
  })
  console.log(output_string)

  return
}

function getMonthOptions(pageElement) {
  let monthElements = pageElement
  let output_string = ""

  if (monthElements.length === 0) return

  monthElements.forEach(element => {
    console.log(element)
    let xpath = getXPath(element)

    let min = "1970-01"
    let max = "2022-12"

    if (element.min !== "") {
      min = element.min
    }

    if (element.max !== "") {
      max = element.max
    }

    let year_min = parseInt(min.split("-")[0])
    let year_max = parseInt(max.split("-")[0])
    let month_min = parseInt(min.split("-")[1])
    let month_max = parseInt(max.split("-")[1])

    // +1 because the maximum is included
    let total_years = year_max - year_min + 1
    let total_months = month_max - month_min + 1

    let possible_sum = total_years * total_months

    output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Month</td><td class=\"column3\">${possible_sum}</td></tr>`
  })

  return output_string
}

function getNumberOptions(pageElement) {
  let numberElements = pageElement
  let output_string = ""

  if (numberElements.length === 0) return

  numberElements.forEach(element => {
    console.log(element)
    let xpath = getXPath(element)

    let min = element.min
    let max = element.max
    let step = 1

    if (element.step !== "") {
      step = element.step
    }

    if (min === "" || max === "") {
      // Infinite options
      output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Number</td><td class=\"column3\">inf</td></tr>`
    } else {
      // Find possible options
      // +1 because default value
      let possible_sum = Math.floor(Math.abs(max - min) / step) + 1
      output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Number</td><td class=\"column3\">${possible_sum}</td></tr>`
    }
  })

  return output_string
}

function getTimeOptions(pageElement) {
  let timeElements = pageElement
  output_string = ""

  if (timeElements.length === 0) return

  timeElements.forEach(element => {
    console.log(element)
    let xpath = getXPath(element)

    let min = "00:00"
    let max = "23:59"
    let step = "60"

    // Checks for default values
    if (element.min !== "") {
      min = element.min
    }

    if (element.max !== "") {
      max = element.max
    }

    if (element.step !== "") {
      step = element.step
    }

    let step_in_minutes = step / 60
    let hh_min = parseInt(min.split(":")[0])
    let hh_max = parseInt(max.split(":")[0])
    let mm_min = parseInt(min.split(":")[1])
    let mm_max = parseInt(max.split(":")[1])

    // No +1 because the maximum is not included
    let hours_to_minutes = (hh_max - hh_min) * 60
    let minutes = mm_max - mm_min
    let possible_sum = ((hours_to_minutes + minutes) / step_in_minutes) + 1

    output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Time</td><td class=\"column3\">${possible_sum}</td></tr>`
  })

  return output_string
}

function getWeekOptions(pageElement) {
  let weekElements = pageElement
  let output_string = ""

  if (weekElements.length === 0) return

  weekElements.forEach(element => {
    console.log(element)
    let xpath = getXPath(element)

    let min = "1970-W1"
    let max = "2022-W52"

    if (element.min !== "") {
      min = element.min
    }

    if (element.max !== "") {
      max = element.max
    }

    let year_min = parseInt(min.split("-W")[0])
    let year_max = parseInt(max.split("-W")[0])
    let week_min = parseInt(min.split("-W")[1])
    let week_max = parseInt(max.split("-W")[1])

    // +1 because the maximum is included
    let total_years = year_max - year_min + 1
    let total_weeks = week_max - week_min + 1

    let possible_sum = total_years * total_weeks

    output_string += `<tr><td class=\"column1\">${xpath}</td><td class=\"column2\">Week</td><td class=\"column3\">${possible_sum}</td></tr>`
  })

  return output_string
}