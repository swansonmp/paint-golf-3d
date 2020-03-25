export default class UIHelper {
  constructor() { }
  
  createElement(spec) {
    let element;
    if (spec.tag == undefined) { element = document.createElement("div"); }
    else { element = document.createElement(spec.tag); }
    
    if (spec.id != undefined) { element.id = spec.id; }
    if (spec.class_ != undefined) { element.class = spec.class_; }
    if (spec.text != undefined) { element.textContent = spec.text; }
    
    document.getElementById("container").appendChild(element);
  }
  
  createElementWithID(tag, id, text) {
    let div = document.createElement(tag);
    div.id = id;
    if (text != undefined) {
      div.textContent = text;
    }
    document.getElementById("container").appendChild(div);
  }
  
  createElementWithClass(tag, class_, text) {
    let div = document.createElement(tag);
    div.class = class_;
    if (text != undefined) {
      div.textContent = text;
    }
    document.getElementById("container").appendChild(div);
  }
  
}