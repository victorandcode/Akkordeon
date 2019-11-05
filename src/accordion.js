const DEFAULT_CONFIG = {
  delay: 400,
  defaultOpened: null,
  openMultiplePanels: false
}

export class Accordion {
  constructor(element, config = {}) {
    const children = element.children
    // Initialise internal state
    this._setConfig(config)
    this._setTitleAndContentNodes(children)
    this.isToggling = false

    // Add click event handler
    this._attachTitleNodesOnClick()

    // Set content nodes attributes
    this._initialiseContentNodes()

    //By default hide everything
    this._hideAllContentNodesButTarget(null)

    // Open default if necessary
    if (config.defaultOpened !== null) {
      this._openDefault(config.defaultOpened)
    }
  }

  /**
   *
   * @param {Object} config
   */
  _setConfig(config) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    }
  }

  /**
   *
   * @param {Array<HTMLElement} children
   */
  _setTitleAndContentNodes(children) {
    const titleNodes = []
    const contentNodes = []
    for (let i = 0; i < children.length; i += 2) {
      titleNodes.push(children[i])
      contentNodes.push(children[i + 1])
    }
    this.titleNodes = titleNodes
    this.contentNodes = contentNodes
  }

  _attachTitleNodesOnClick() {
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

  _initialiseContentNodes() {
    for (let contentNode of this.contentNodes) {
      contentNode.style.transitionDuration = this.config.delay + "ms"
      contentNode.classList.add("is-hidden")
    }
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
  _hideAllContentNodesButTarget(targetContentNode) {
    for (let contentNode of this.contentNodes) {
      if (contentNode !== targetContentNode) {
        contentNode.classList.add("is-hidden")
      }
    }
  }

  /**
   *
   * @param {HTMLElement} targetContentNode
   */
  toggleContentNode(targetContentNode) {
    if (!this.config.openMultiplePanels) {
      this._hideAllContentNodesButTarget(targetContentNode)
    }
    // Here lies the problem
    if (targetContentNode.classList.contains("is-hidden")) {
      targetContentNode.classList.remove("is-hidden")
    } else {
      targetContentNode.classList.add("is-hidden")
    }
  }

  _openDefault(titleNodeIndex) {
    const titleNodeLength = this.titleNodes.length
    if (titleNodeIndex < titleNodeLength) {
      this.titleNodes[titleNodeIndex].click()
    } else {
      console.warn(
        `${titleNodeIndex} index not found. Accordion has only ${titleNodeLength} elements`
      )
    }
  }
}
