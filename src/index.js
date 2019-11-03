import { Accordion } from "./accordion"
import "./accordion.scss"

const element = document.getElementById("my-accordion")
new Accordion(element, { delay: 400, openMultiplePanels: true })
