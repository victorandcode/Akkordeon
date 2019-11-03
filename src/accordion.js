import { slideUp, slideDown } from "./sliding"

/**
 *
 * @param {HTMLElement} element
 */
export const makeAccordion = element => {
  const children = element.children
  const titleNodes = []
  const contentNodes = []
  for (let i = 0; i < children.length; i += 2) {
    titleNodes.push(children[i])
    contentNodes.push(children[i + 1])
  }
  titleNodes.forEach((titleNode, index) => {
    const contentNode = contentNodes[index]
    const onTitleClick = () => {
      toggleTitleNode(titleNodes, titleNode)
      toggleContentNode(contentNodes, contentNode)
    }
    titleNode.addEventListener("click", onTitleClick)
  })
  //By default hide everything
  toggleContentNode(contentNodes, null)
}

/**
 *
 * @param {Array<HTMLElement>} allTitleNodes
 * @param {HTMLElement} targetTitleNode
 */
function toggleTitleNode(allTitleNodes, targetTitleNode) {
  for (let titleNode of allTitleNodes) {
    if (titleNode !== targetTitleNode) {
      titleNode.classList.remove("is-expanded")
    }
  }
  targetTitleNode.classList.toggle("is-expanded")
}

/**
 *
 * @param {Array<HTMLElement>} allContentNodes
 * @param {HTMLElement} contentNode
 */
const toggleContentNode = (allContentNodes, targetContentNode) => {
  for (let contentNode of allContentNodes) {
    if (contentNode !== targetContentNode) {
      slideUp(contentNode)
    }
  }
  if (getComputedStyle(targetContentNode).display === "none") {
    slideDown(targetContentNode)
  } else {
    slideUp(targetContentNode)
  }
}
