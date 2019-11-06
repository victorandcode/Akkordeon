import { Accordion } from "./accordion"
import "./accordion.scss"

const element = document.getElementById("my-accordion")
const accordionInstance = new Accordion(element, {
  delay: 400,
  canOpenMultiple: true,
  defaultOpenedIndex: null,
  onToggle: (titleElement, contentElement, index) => {
    console.log("The titleElement is", titleElement)
    console.log("contentElement: ", contentElement)
    console.log("index: ", index)
  },
})

document
  .getElementById("toggleItem")
  .addEventListener("click", () => accordionInstance.toggleAtIndex(1))
