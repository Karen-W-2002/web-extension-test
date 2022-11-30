// input-options.js

// TODO: days in dates are a bit funky because edge case for min max same month and year... doesn't subtract the days
// Input elements functions
function getCheckboxOptions(pageElement, text_list) {
  let checkboxElements = pageElement
  let output_string = ""

  if (checkboxElements.length == 0) return

  checkboxElements.forEach(element => {
    if (isVisible(element)) {
      console.log(element)
      output_string += getNearestText(element, text_list)
    }
  })

  return output_string
}

function getColorOptions(pageElement) {
  let colorElements = pageElement
  let output_string = ""

  if (colorElements.length == 0) return

  colorElements.forEach(element => {
    console.log(element)
    output_string += "Color Input" + NEWLINE
    output_string += "red: 256, green: 256, blue: 256 options" + NEWLINE + NEWLINE
  })
  console.log(output_string)

  return
}

function getDateOptions(pageElement) {
  let dateElements = pageElement
  let output_string = ""

  if (dateElements.length == 0) return

  dateElements.forEach(element => {
    console.log(element)

    // default values
    let min = "1970-01-01"
    let max = "2022-12-31"

    // Checks for default values
    if (element.min != "") {
      min = element.min
    }

    if (element.max != "") {
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

    // DD: 31 days because maximum days in some months
    let possible_sum1 = 31

    let possible_sum2 = month_max + (13 - month_min) + ((total_years - 2) * 12)

    output_string += "Date Input" + NEWLINE
    output_string += "options DD: " + possible_sum1 + NEWLINE
    output_string += "options MM/YY: " + possible_sum2 + NEWLINE + NEWLINE
  })
  console.log(output_string)

  return
}

function getDatetimelocalOptions(pageElement) {
  let dateElements = pageElement
  let output_string = ""

  if (dateElements.length == 0) return

  dateElements.forEach(element => {
    console.log(element)
    let min = "1970-01-01-00:00"
    let max = "2022-12-31-23:59"
    let step = "60"

    // Checks for default values
    if (element.min != "") {
      min = element.min
    }

    if (element.max != "") {
      max = element.max
    }

    if (element.step != "") {
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

    // DD: 31 days because maximum days in a month
    let possible_sum1 = 31
    let possible_sum2 = month_max + (12 - month_min) + ((total_years - 2) * 12) + 1
    let possible_sum3 = ((hours_to_minutes + minutes) / step_in_minutes) + 1

    output_string += "Datetime-local Input" + NEWLINE
    output_string += "options DD: " + possible_sum1 + NEWLINE
    output_string += "options MM/YY: " + possible_sum2 + NEWLINE
    output_string += "options HH/MM: " + possible_sum3 + NEWLINE + NEWLINE
  })
  console.log(output_string)

  return
}

function getFileOptions(pageElement) {
  let fileElements = pageElement
  let output_string = ""

  if (fileElements.length == 0) return

  fileElements.forEach(element => {
    console.log(element)
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

  if (monthElements.length == 0) return

  monthElements.forEach(element => {
    console.log(element)
    let min = "1970-01"
    let max = "2022-12"

    if (element.min != "") {
      min = element.min
    }

    if (element.max != "") {
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

    output_string += "Month Input" + NEWLINE
    output_string += "options: " + possible_sum + NEWLINE + NEWLINE
  })
  console.log(output_string)

  return
}

function getNumberOptions(pageElement) {
  let numberElements = pageElement
  let output_string = ""

  if (numberElements.length == 0) return

  numberElements.forEach(element => {
    console.log(element)
    let min = element.min
    let max = element.max
    let step = 1

    if (element.step != "") {
      step = element.step
    }

    if (min == "" || max == "") {
      output_string += "Number Input" + NEWLINE
      output_string += "Infinite options" + NEWLINE + NEWLINE
    } else {
      // Find possible options
      // +1 because default value
      let possible_sum = Math.floor(Math.abs(max - min) / step) + 1

      output_string += "Number Input" + NEWLINE
      output_string += "options: " + possible_sum + NEWLINE + NEWLINE
    }
  })
  console.log(output_string)

  return
}

// FIXME: same namme different forms are in different groups 
function getRadioOptions(pageElement) {
  let radioElements = pageElement
  let output_string = "";

  if (radioElements.length == 0) return

  let radioHashmap = {}

  radioElements.forEach(element => {
    console.log(element)
    if (radioHashmap[element.name] == null) {
      radioHashmap[element.name] = 1
    } else {
      radioHashmap[element.name]++
    }
  })

  // key is the element.name
  for (const key in radioHashmap) {
    output_string += "Radio Input" + NEWLINE
    output_string += key + " options: " + radioHashmap[key] + NEWLINE + NEWLINE
  }
  console.log(output_string)

  return
}

function getRangeOptions(pageElement) {
  let rangeElements = pageElement
  let output_string = ""

  if (rangeElements.length == 0) return

  rangeElements.forEach(element => {
    console.log(element)
    let min = 0
    let max = 100
    let step = 1

    // Checks for default values
    if (element.min != "") {
      min = element.min
    }

    if (element.max != "") {
      max = element.max
    }

    if (element.step != "") {
      step = element.step
    }

    // Find possible options
    // +1 because default value
    let possible_sum = Math.floor(Math.abs(max - min) / step) + 1

    output_string += "Range Input" + NEWLINE
    output_string += "options: " + possible_sum + NEWLINE + NEWLINE
  })
  console.log(output_string)

  return
}

// TODO: Some options are data-placeholders (don't count)
function getSelectOptions(pageElement) {
  let selectOptionElements = pageElement
  let output_string = ""

  if (selectOptionElements.length == 0) return

  selectOptionElements.forEach(element => {
    console.log(element)
    let optionsElements = element.querySelectorAll('option')
    console.log("Select/Option Input" + NEWLINE + "options: " + optionsElements.length + NEWLINE + NEWLINE)


    // output_string += "Select/Option Input" + NEWLINE
    // output_string += "options: " + optionsElements.length + NEWLINE + NEWLINE
  })
  // console.log(output_string)

  return
}

function getTimeOptions(pageElement) {
  let timeElements = pageElement
  output_string = ""

  if (timeElements.length == 0) return

  timeElements.forEach(element => {
    console.log(element)
    let min = "00:00"
    let max = "23:59"
    let step = "60"

    // Checks for default values
    if (element.min != "") {
      min = element.min
    }

    if (element.max != "") {
      max = element.max
    }

    if (element.step != "") {
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

    output_string += "Time Input" + NEWLINE
    output_string += "options: " + possible_sum + NEWLINE + NEWLINE

  })
  console.log(output_string)

  return
}

function getWeekOptions(pageElement) {
  let weekElements = pageElement
  let output_string = ""

  if (weekElements.length == 0) return

  weekElements.forEach(element => {
    console.log(element)
    let min = "1970-W1"
    let max = "2022-W52"

    if (element.min != "") {
      min = element.min
    }

    if (element.max != "") {
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

    output_string += "Week Input" + NEWLINE
    output_string += "options: " + possible_sum + NEWLINE + NEWLINE
  })
  console.log(output_string)

  return
}