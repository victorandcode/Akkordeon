import { slideUp, slideDown } from "./sliding"

/**
 *
 * @param {HTMLElement} element
 */
export const makeAccordion = element => {
  const children = element.children
  for (let i = 0; i < children.length; i += 2) {
    const titleNode = children[i]
    const contentNode = children[i + 1]
    const onTitleClick = () => displayOnlySelected(children, contentNode)
    initialiseTitle(titleNode, onTitleClick)
  }
  //By default hide everything
  displayOnlySelected(children, null)
}

/**
 *
 * @param {Array<HTMLElement>} elements
 */
const displayOnlySelected = (elements, selectedElement) => {
  for (let i = 1; i < elements.length; i += 2) {
    const element = elements[i]
    if (element !== selectedElement) {
      slideUp(element)
    }
  }
  slideDown(selectedElement)
}

/**
 *
 * @param {HTMLElement} title
 * @param {MouseEvent} onClick
 */
function initialiseTitle(title, onClick) {
  title.addEventListener("click", onClick)
}
