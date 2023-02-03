function getTextList() {
  let element_list = document.querySelectorAll('label, p, span, div, a, i')

  let pos_list = []

  // Searches for elements with only text and pushes it into a new list
  element_list.forEach(el => {

    // If el doesn't exist on the page, skip this element
    if (!isVisible(el)) return

    // Checks if any text/elements are nested within the current el
    // Then checks if the nested text/element is a text (nodeValue will be null if its another element)
    // Get the children of current element
    let children = el.childNodes
    // Loop through each children
    for(const node of children)
    {
      if(node.nodeValue)
      {
        let processed_str = node.nodeValue.trim()
        if(processed_str != "")
        {
          let pos = el.getBoundingClientRect()
          pos_list.push({ element: el, pos: pos, label: processed_str})
        }
      }
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
    // (x1,y1) is the position of the input element
    // (x2, y2) is the position of the text element
    let x1_left = element_pos.left
    let x1_right = element_pos.right
    let y1_top = element_pos.top
    let y1_bottom = element_pos.bottom

    let x2_left = text_el.pos.left
    let x2_right = text_el.pos.right
    let y2_top = text_el.pos.top
    let y2_bottom = text_el.pos.bottom

    let distance_x = x2_left - x1_left
    let distance_y = y2_top - y1_top

    let offset_y_top = Math.abs(y2_top - y1_top)
    let offset_y_bottom = Math.abs(y2_bottom - y1_bottom)
    let offset_y_total = offset_y_top + offset_y_bottom

    let offset_x_left = Math.abs(x2_left - x1_left)
    let offset_x_right = Math.abs(x2_right - x1_right)
    let offset_x_total = offset_x_left + offset_x_right

    // Check for nearest text RIGHT of the element
    if (((distance_x >= 0) && (distance_x <= 50) && (offset_y_total <= 50))) {
      let new_nearest = {
        distance_x: distance_x,
        offset_y: offset_y_total,
        element: text_el.element,
        label: text_el.label,
      }
      if (nearest_text.right === null) nearest_text.right = new_nearest
      else {
        if (nearest_text.right.offset_y > new_nearest.offset_y) nearest_text.right = new_nearest
      }
    }

    // Check for nearest text TOP of the element
    if(((distance_y >= 0) && (distance_y <= 50)) && (offset_x_total <= 50)) {
      let new_nearest = {
        distance_y: this.distance_y,
        offset_x: offset_x_total,
        element: text_el.element,
        label: text_el.label,
      }
      if(nearest_text.top === null) nearest_text.top = new_nearest
      else {
        if(nearest_text.top.offset_x > new_nearest.offset_x) nearest_text.top = new_nearest
      }
    }
  })

  // TODO: currently it is a simplified version (only right and top)
  if (nearest_text.right)
    return `${nearest_text.right.label}, `
    // return `<p>${element.type} input name - ${nearest_text.right.label}</p>`
  // else if(nearest_text.top)
  // {
  //   console.log(nearest_text)
  //   console.log(nearest_text.top)
  //   return `<p>${element.type} input name - ${nearest_text.top.label}</p>`
  // }
    
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