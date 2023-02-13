// xpath.js

// For now, this function only gets the XPath of input elements
function getXPath(element)
{
  if(!element) return;
  if(element.id && element.type != "radio") return "id=" + element.id;
  if(element.name && element.type != "radio") return "name=" + element.name;
  // Find path instead
  return "//" + getPathTo(element);
}

function getPathTo(element)
{
  if(element === document.body)
    return element.tagName.toLowerCase();

  var ix = 0;
  var siblings = element.parentNode.childNodes;

  for(var i=0; i<siblings.length; i++) {
    var sibling = siblings[i];
    if(sibling === element) return getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix+1) + ']';
    if(sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
  }
}