import { isElement } from "./dom-validation"

const DEFAULT_CONFIG = {
  defaultOpenedIndex: null,
  delay: 400,
  onToggle: null,
  canOpenMultiple: false,
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

    // Open default if necessary
    if (config.defaultOpenedIndex !== null) {
      this.toggleAtIndex(config.defaultOpenedIndex)
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
        this._toggleTitleElement(titleElement)
        this._toggleContentElement(contentElement)
        if (this.config.onToggle) {
          this.config.onToggle(titleElement, contentElement, index)
        }

        // While animation is happening, don't allow another click
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
      // Set elements hidden by default
      contentElement.classList.add("is-hidden")
    }
  }

  /**
   *
   * @param {HTMLElement} targetTitleElement
   */
  _toggleTitleElement(targetTitleElement) {
    // If only one item can be opened, hide the others
    if (!this.config.canOpenMultiple) {
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
  _toggleContentElement(targetContentElement) {
    if (!this.config.canOpenMultiple) {
      this._hideAllContentElementsButTarget(targetContentElement)
    }
    // Here lies the problem
    if (targetContentElement.classList.contains("is-hidden")) {
      targetContentElement.classList.remove("is-hidden")
    } else {
      targetContentElement.classList.add("is-hidden")
    }
  }

  toggleAtIndex(index) {
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
