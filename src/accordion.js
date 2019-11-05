import { isElement } from "./dom-validation"

const DEFAULT_CONFIG = {
  defaultOpened: null,
  delay: 400,
  onToggle: null,
  openMultiplePanels: false,
}

export class Accordion {
  constructor(element, config = {}) {
    if (!isElement(element)) {
      console.error(
        `Failed to initialise accordion "${element}" is not an object of type Element`,
      )
      return
    }
    const children = element.children
    // Initialise internal state
    this._setConfig(config)
    this._setTitleAndContentElements(children)
    this.isToggling = false

    // Add click event handler
    this._attachTitleElementsOnClick()

    // Set content elements attributes
    this._initialiseContentElements()

    //By default hide everything
    this._hideAllContentElementsButTarget(null)

    // Open default if necessary
    if (config.defaultOpened !== null) {
      this.toggleItem(config.defaultOpened)
    }
  }

  /**
   *
   * @param {Object} config
   */
  _setConfig(config) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    }
  }

  /**
   *
   * @param {Array<HTMLElement} children
   */
  _setTitleAndContentElements(children) {
    const titleElements = []
    const contentElements = []
    for (let i = 0; i < children.length; i += 2) {
      titleElements.push(children[i])
      contentElements.push(children[i + 1])
    }
    this.titleElements = titleElements
    this.contentElements = contentElements
  }

  _attachTitleElementsOnClick() {
    this.titleElements.forEach((titleElement, index) => {
      const contentElement = this.contentElements[index]
      const onTitleClick = () => {
        if (this.isToggling) {
          return
        }
        this.isToggling = true
        this.tiggleTitleElement(titleElement)
        this._toggleItem(contentElement)
        if (this.config.onToggle) {
          this.config.onToggle(titleElement, contentElement, index)
        }
        setTimeout(() => {
          this.isToggling = false
        }, this.config.delay)
      }
      titleElement.addEventListener("click", onTitleClick)
    })
  }

  _initialiseContentElements() {
    for (let contentElement of this.contentElements) {
      contentElement.style.transitionDuration = this.config.delay + "ms"
      contentElement.classList.add("is-hidden")
    }
  }

  /**
   *
   * @param {HTMLElement} targetTitleElement
   */
  tiggleTitleElement(targetTitleElement) {
    // If multiple panels can be opened, then leave the others as they are
    if (!this.config.openMultiplePanels) {
      for (let titleElement of this.titleElements) {
        if (titleElement !== targetTitleElement) {
          titleElement.classList.remove("is-expanded")
        }
      }
    }
    targetTitleElement.classList.toggle("is-expanded")
  }

  /**
   *
   * @param {HTMLElement|null} targetContentElement
   */
  _hideAllContentElementsButTarget(targetContentElement) {
    for (let contentElement of this.contentElements) {
      if (contentElement !== targetContentElement) {
        contentElement.classList.add("is-hidden")
      }
    }
  }

  /**
   *
   * @param {HTMLElement} targetContentElement
   */
  _toggleItem(targetContentElement) {
    if (!this.config.openMultiplePanels) {
      this._hideAllContentElementsButTarget(targetContentElement)
    }
    // Here lies the problem
    if (targetContentElement.classList.contains("is-hidden")) {
      targetContentElement.classList.remove("is-hidden")
    } else {
      targetContentElement.classList.add("is-hidden")
    }
  }

  toggleItem(index) {
    const titleElementLength = this.titleElements.length
    if (index >= 0 && index < titleElementLength) {
      this.titleElements[index].click()
    } else {
      console.warn(
        `${index} index not found. Accordion has only ${titleElementLength} elements`,
      )
    }
  }
}
