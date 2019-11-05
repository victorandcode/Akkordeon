import { Accordion } from "./accordion"
import "./accordion.scss"

const element = document.getElementById("my-accordion")
const accordionInstance = new Accordion(element, {
  delay: 400,
  openMultiplePanels: false,
  defaultOpened: 0,
  onToggle: (titleNode, contentNode, index) => {
    console.log("The titleNode is", titleNode)
    console.log("contentNode: ", contentNode)
    console.log("index: ", index)
  },
})

document
  .getElementById("toggleItem")
  .addEventListener("click", () => accordionInstance.toggleItem(1))
