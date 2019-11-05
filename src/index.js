import { Accordion } from "./accordion"
import "./accordion.scss"

const element = document.getElementById("my-accordion")
const accordionInstance = new Accordion(element, {
  delay: 400,
  openMultiplePanels: false,
  defaultOpened: 0,
  onToggle: (titleElement, contentElement, index) => {
    console.log("The titleElement is", titleElement)
    console.log("contentElement: ", contentElement)
    console.log("index: ", index)
  },
})

document
  .getElementById("toggleItem")
  .addEventListener("click", () => accordionInstance.toggleItem(1))
