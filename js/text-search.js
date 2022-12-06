function getTextList() {
  let element_list = document.querySelectorAll('label, p, span, div, a, i')

  let pos_list = []

  // Searches for elements with only text and pushes it into a new list
  element_list.forEach(el => {

    // If el doesn't exist on the page, skip this element
    if (!isVisible(el)) return

    // Checks if any text/elements are nested within the current el
    // Then checks if the first nested text/element is a text (nodeValue will be null if its another element)
    // TODO: should loop through all the child nodes instead of checking just the first childnode
    if (el.childNodes[0] && el.childNodes[0].nodeValue) {
      let pos = el.getBoundingClientRect()
      pos_list.push({ element: el, pos: pos })
    }
  })

  return pos_list
}

// Finds the smallest offset for all 4 sides of the element
function getNearestText(element, text_list) {
  // Initializes object for the elements of the smallest offset of each direction
  let nearest_text = { top: null, right: null, bottom: null, left: null }

  // Gets the position of the current input element
  let element_pos = element.getBoundingClientRect()

  // Loops through the list of text elements
  text_list.forEach(text_el => {
    let x1 = element_pos.left
    let y1 = element_pos.top
    let y1_bottom = element_pos.bottom

    let x2 = text_el.pos.left
    let y2 = text_el.pos.top
    let y2_bottom = text_el.pos.bottom

    let distance_x = x2 - x1
    let distance_y_top = Math.abs(y2 - y1)
    let distance_y_bottom = Math.abs(y2_bottom - y1_bottom)
    let distance_y_total = distance_y_top + distance_y_bottom

    // Check for nearest text RIGHT of the element
    if (((distance_x >= 0) && (distance_x <= 50) && (distance_y_total <= 50))) {
      let new_nearest = {
        distance_x: distance_x,
        distance_y: distance_y_total,
        element: text_el.element,
      }
      if (nearest_text.right == null) nearest_text.right = new_nearest
      else {
        // if ((nearest_text.right.distance_x > new_nearest.distance_x))
        if (nearest_text.right.distance_y > new_nearest.distance_y) nearest_text.right = new_nearest
      }
    }
  })

  // TODO: currently it is a simplified version (only right)
  if (nearest_text.right)
    return `<p>${element.type} input name - ${nearest_text.right.element.childNodes[0].nodeValue}</p><br/>`
  return ''
}

// check visibility of element
function isVisible(element) {
  try {
    const style = window.getComputedStyle(element);
    if (style.display === "none" || style.display == "none !important") return false;
    if (style.visibility !== "visible") return false;
    if (element.offsetParent == null) return false;
    if (style.opacity < 0.1) return false;
    if (element.offsetWidth + element.offsetHeight + element.getBoundingClientRect().height + element.getBoundingClientRect().width === 0) {
      return false;
    }
  } catch (e) { console.log("Not an element.") } // Skip if it is other type element.
  return true;
}