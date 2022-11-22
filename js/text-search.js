function getTextList() {
  let element_list = document.querySelectorAll('label, p, span, div')
  let text_list = []
  let pos_list = []

  // Searches for elements with only text and pushes it into a new list
  element_list.forEach(el => {
    // TODO: remove all the child contents FIRST?

    if (el.childElementCount == 0) {
      // innerHTML and textContext difference?
      // if (el.innerHTML) {
      text_list.push(el)
    }
  })

  text_list.forEach(el => {
    let pos = el.getBoundingClientRect()
    pos_list.push({ element: el, pos: pos })
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
    let right_space = el.pos.left - element_pos.right
    let left_space = element_pos.left - el.pos.right

    // let offset_right = Math.abs(element_pos.right - el.pos.right)
    // let offset_bottom = Math.abs(element_pos.bottom - el.pos.bottom)
    // let offset_left = Math.abs(element_pos.left - el.pos.left)

    // If empty, sets the new offsets.top
    // otherwise checks if the new offset_top is smaller
    // AND it then checks if the right and left spaces between the input and text is smaller than 50px
    // EDIT: to only right space
    if ((text_elements.top == null || (offsets.top > offset_top))
      && ((right_space < 50 && right_space > 0))) {
      offsets.top = offset_top
      text_elements.top = el.element
    }
  })
  // Do something with offset
  // TODO: use all the offsets in the future, currently it is a simplified version (only right)
  console.log(text_elements.top)
  // console.log(text_elements.top.firstChild.textContent)
  // console.log(text_elements.top.textContext)
  // console.log(offsets)
}