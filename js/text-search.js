function getTextList() {
  let element_list = document.querySelectorAll('label, p, span, div, a')
  let pos_list = []

  // Searches for elements with only text and pushes it into a new list
  element_list.forEach(el => {

    // Checks if any text/elements are nested within the current el
    // Then checks if the first nested text/element is a text (nodeValue will be null if its another element)
    if (el.childNodes[0] && el.childNodes[0].nodeValue) {
      let pos = el.getBoundingClientRect()
      pos_list.push({ element: el, pos: pos })
    }
  })

  return pos_list
}

// Finds the smallest offset for all 4 sides of the element
function getNearestText(element, text_list) {
  // Initialize object for group of smallest offset
  let offsets = { top: -1, right: -1, bottom: -1, left: -1 }
  // Initializes object for the elements of the smallest offset of each direction
  let text_elements = { top: null, right: null, bottom: null, left: null }
  // Gets the position of the current input element
  let element_pos = element.getBoundingClientRect()
  // Loops through the list of text elements
  text_list.forEach(el => {
    let offset_top = Math.abs(element_pos.top - el.pos.top)
    let offset_bottom = Math.abs(element_pos.bottom - el.pos.bottom)
    let offset_right = Math.abs(element_pos.right - el.pos.right)
    let offset_left = Math.abs(element_pos.left - el.pos.left)

    // OFFSET has no direction, so we check it is positioned in the correct direction using the space in between
    let top_space = element_pos.top - el.pos.bottom
    let bottom_space = el.pos.top - element_pos.bottom
    let right_space = el.pos.left - element_pos.right
    let left_space = element_pos.left - el.pos.right

    // If empty, sets the new text_elements.top
    // otherwise checks if the new offset_top is smaller
    // AND it then checks if the right and left spaces between the input and text is smaller than 50px

    // Check RIGHT
    if ((text_elements.top == null || (offsets.top + offsets.bottom > offset_top + offset_bottom))
      && ((right_space < 50 && right_space > 0))) {
      offsets.top = offset_top
      offsets.bottom = offset_bottom
      text_elements.top = el.element
    }
    // TODO: USE ELSE IF OR IF?
  })
  // Do something with offset
  // TODO: use all the offsets in the future, currently it is a simplified version (only right)
  console.log(text_elements.top.childNodes[0].nodeValue)
  // console.log(text_elements.top.firstChild.textContent)
  // console.log(text_elements.top.textContext)
  // console.log(offsets)
}