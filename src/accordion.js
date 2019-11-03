import { slideUp, slideDown } from "./sliding"

const DEFAULT_CONFIG = {
  delay: 400,
  openMultiplePanels: false
}

export class Accordion {
  constructor(element, config = {}) {
    const children = element.children
    this.setConfig(config)
    this.setTitleAndContentNodes(children)
    this.isToggling = false
    this.attachTitleNodesOnClick()
    //By default hide everything
    this.hideAllContentNodesButTarget(null)
  }

  /**
   *
   * @param {Object} config
   */
  setConfig(config) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    }
  }

  /**
   *
   * @param {Array<HTMLElement} children
   */
  setTitleAndContentNodes(children) {
    const titleNodes = []
    const contentNodes = []
    for (let i = 0; i < children.length; i += 2) {
      titleNodes.push(children[i])
      contentNodes.push(children[i + 1])
    }
    this.titleNodes = titleNodes
    this.contentNodes = contentNodes
  }

  attachTitleNodesOnClick() {
    this.titleNodes.forEach((titleNode, index) => {
      const contentNode = this.contentNodes[index]
      const onTitleClick = () => {
        if (this.isToggling) {
          return
        }
        this.isToggling = true
        this.toggleTitleNode(titleNode)
        this.toggleContentNode(contentNode)
        setTimeout(() => {
          this.isToggling = false
        }, this.config.delay)
      }
      titleNode.addEventListener("click", onTitleClick)
    })
  }

  /**
   *
   * @param {HTMLElement} targetTitleNode
   */
  toggleTitleNode(targetTitleNode) {
    // If multiple panels can be opened, then leave the others as they are
    if (!this.config.openMultiplePanels) {
      for (let titleNode of this.titleNodes) {
        if (titleNode !== targetTitleNode) {
          titleNode.classList.remove("is-expanded")
        }
      }
    }
    targetTitleNode.classList.toggle("is-expanded")
  }

  /**
   *
   * @param {HTMLElement|null} targetContentNode
   */
  hideAllContentNodesButTarget(targetContentNode) {
    for (let contentNode of this.contentNodes) {
      if (contentNode !== targetContentNode) {
        slideUp(contentNode, this.config.delay)
      }
    }
  }

  /**
   *
   * @param {HTMLElement} targetContentNode
   */
  toggleContentNode(targetContentNode) {
    if (!this.config.openMultiplePanels) {
      this.hideAllContentNodesButTarget(targetContentNode)
    }
    if (getComputedStyle(targetContentNode).display === "none") {
      slideDown(targetContentNode, this.config.delay)
    } else {
      slideUp(targetContentNode, this.config.delay)
    }
  }
}
