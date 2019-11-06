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
    this._initialiseTitleElements()

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
   * @param {Array<Element} children
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

  _initialiseTitleElements() {
    this.titleElements.forEach((titleElement, index) => {
      const contentElement = this.contentElements[index]

      titleElement.addEventListener("click", () =>
        this._onTitleClick(titleElement, contentElement, index),
      )
      titleElement.addEventListener("keydown", e =>
        this._onTitleKeydown(e, titleElement, contentElement, index),
      )
      titleElement.setAttribute("tabindex", "0")
    })
  }

  _onTitleClick(titleElement, contentElement, titleIndex) {
    if (this.isToggling) {
      return
    }
    this.isToggling = true
    this._updateTitleElementsIsExpanded(titleElement)
    this._toggleContentElement(contentElement)
    if (this.config.onToggle) {
      this.config.onToggle(titleElement, contentElement, titleIndex)
    }

    // While animation is happening, don't allow another click
    setTimeout(() => {
      this.isToggling = false
    }, this.config.delay)
  }

  _onTitleKeydown(event, titleElement, contentElement, titleIndex) {
    // If key is equal to Enter or Space
    if (event.keyCode === 13 || event.keyCode === 32) {
      this._onTitleClick(titleElement, contentElement, titleIndex)
    }
  }

  /**
   *
   * @param {Element} targetTitleElement
   */
  _updateTitleElementsIsExpanded(targetTitleElement) {
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

  _initialiseContentElements() {
    for (let contentElement of this.contentElements) {
      contentElement.style.transitionDuration = this.config.delay + "ms"
      // Set elements hidden by default
      contentElement.classList.add("is-hidden")
    }
  }

  /**
   *
   * @param {Element} targetContentElement
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

  /**
   *
   * @param {Element|null} targetContentElement
   */
  _hideAllContentElementsButTarget(targetContentElement) {
    for (let contentElement of this.contentElements) {
      if (contentElement !== targetContentElement) {
        contentElement.classList.add("is-hidden")
      }
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
