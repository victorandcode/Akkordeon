import { Accordion } from "./accordion"
import "./accordion.scss"

const element = document.getElementById("my-accordion")
new Accordion(element, {
  delay: 400,
  openMultiplePanels: false,
  defaultOpened: 0,
  onToggle: (titleNode, contentNode, index) => {
    console.log("The titleNode is", titleNode)
    console.log("contentNode: ", contentNode)
    console.log("index: ", index)
  },
})
