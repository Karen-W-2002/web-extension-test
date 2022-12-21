// xpath.js

// For now, this function only gets the XPath of input elements...
function getXPath(element)
{
  if(!element) return
  if(element.id) return "id=" + element.id
  if(element.name) return "name=" + element.name
  // Find path
  return "some path"
}