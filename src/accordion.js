import { isElement } from "./dom-validation"
import { getRandomInt } from "./random"

const DEFAULT_CONFIG = {
  defaultOpenedIndex: null,
  delay: 400,
  onToggle: null,
  canOpenMultiple: false,
}

export class Akkordeon {
  constructor(containerElement, config = {}) {
    if (!isElement(containerElement)) {
      console.error(
        `Failed to initialise accordion "${containerElement}" is not an object of type Element`,
      )
      return
    }
    const children = containerElement.children
    // Initialise internal state
    this.containerElement = containerElement
    this._setConfig(config)
    this._setTitleAndContentElements(children)
    this._setUniqueIds()
    this.isToggling = false

    // Add container element attributes
    this._initialiseContainerElement()

    // Add title elements attributes
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

  _setUniqueIds() {
    this.ids = this.titleElements.map(() => getRandomInt())
  }

  _initialiseContainerElement() {
    this.containerElement.setAttribute("role", "tablist")
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
      titleElement.setAttribute("role", "tab")
      titleElement.setAttribute("tabindex", "0")
      titleElement.setAttribute("aria-selected", "false")
      titleElement.setAttribute(
        "aria-controls",
        `contentElement-${this.ids[index]}`,
      )
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
          titleElement.setAttribute("aria-selected", "false")
        }
      }
    }

    if (targetTitleElement.classList.contains("is-expanded")) {
      targetTitleElement.classList.remove("is-expanded")
      targetTitleElement.setAttribute("aria-selected", "false")
    } else {
      targetTitleElement.classList.add("is-expanded")
      targetTitleElement.setAttribute("aria-selected", "true")
    }
  }

  _initialiseContentElements() {
    this.contentElements.forEach((contentElement, index) => {
      contentElement.style.transitionDuration = this.config.delay + "ms"
      // Set elements hidden by default
      contentElement.classList.add("is-hidden")
      contentElement.setAttribute("role", "tabpanel")
      contentElement.setAttribute("id", `contentElement-${this.ids[index]}`)
      contentElement.setAttribute("aria-expanded", "false")
    })
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
      targetContentElement.setAttribute("aria-expanded", "true")
    } else {
      targetContentElement.classList.add("is-hidden")
      targetContentElement.setAttribute("aria-expanded", "false")
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
