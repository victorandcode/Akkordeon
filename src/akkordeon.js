import { isElement } from "./utils/dom-validation"
import { getRandomInt } from "./utils/random"

const DEFAULT_CONFIG = {
  defaultOpenedIndex: null,
  delay: 400,
  onToggle: null,
  canOpenMultiple: false,
}

export class Akkordeon {
  /**
   *
   * @param {Element} containerElement The element that contains the accordion content
   * @param {Object} config
   */
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
    if (this.config.defaultOpenedIndex !== null) {
      this.toggleAtIndex(config.defaultOpenedIndex)
    }
  }

  /**
   * Saves locally the configuration by overriding the defaults
   * @param {Object} config The config options
   */
  _setConfig(config) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    }
  }

  /**
   * Extracts title and content elements and saves them locally.
   * It assumes that uneven indexes are title elements and even
   * ones correspond to content elements
   * @param {Array<Element>} children Child elements of wrapper
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

  /**
   * Saves unique ids to be used for id attribute
   */
  _setUniqueIds() {
    this.ids = this.titleElements.map(() => getRandomInt())
  }

  /**
   * Sets accessibility attribute for container element
   */
  _initialiseContainerElement() {
    this.containerElement.setAttribute("role", "tablist")
  }

  /**
   * Iterates over title elements and initialises them
   */
  _initialiseTitleElements() {
    this.titleElements.forEach((titleElement, index) => {
      const contentElement = this.contentElements[index]
      this._initialiseTitleElement(titleElement, contentElement, index)
    })
  }

  /**
   * Sets attributes and callbacks for title elements to be accessible
   * and interactable
   * @param {Element} titleElement Element to attach events and attributes to
   * @param {Element} contentElement Associated content element
   * @param {number} index Index of title element
   */
  _initialiseTitleElement(titleElement, contentElement, index) {
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
    const expansionIcon = document.createElement("span")
    expansionIcon.classList.add("Akkordeon-expansionIcon")
    titleElement.prepend(expansionIcon)
  }

  /**
   *
   * @param {Element} titleElement Target titleElement
   * @param {Element} contentElement Associated contentElement
   * @param {number} titleIndex Index of title element
   */
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

  /**
   *
   * @param {Event} event Event object when the title element is clicked
   * @param {Element} titleElement Target titleElement
   * @param {Element} contentElement Associated contentElement
   * @param {Element} titleIndex Index of title element
   */
  _onTitleKeydown(event, titleElement, contentElement, titleIndex) {
    // If key is equal to Enter or Space
    if (event.keyCode === 13 || event.keyCode === 32) {
      this._onTitleClick(titleElement, contentElement, titleIndex)
    }
  }

  /**
   * Updates attributes that signal being expanded for target element
   * and other title elements if needed
   * @param {Element} targetTitleElement Target title element
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

  /**
   * Iterates over content elements to set attributes
   */
  _initialiseContentElements() {
    this.contentElements.forEach((contentElement, index) => {
      this._initialiseContentElement(contentElement, index)
    })
  }

  /**
   * Sets attributes for content elements to be accessible and have
   * relevant animation
   */
  _initialiseContentElement(contentElement, index) {
    contentElement.style.transitionDuration = this.config.delay + "ms"
    // Set elements hidden by default
    contentElement.classList.add("is-hidden")
    contentElement.setAttribute("role", "tabpanel")
    contentElement.setAttribute("id", `contentElement-${this.ids[index]}`)
    contentElement.setAttribute("aria-expanded", "false")
  }

  /**
   * Setts attributes related to the visibility of the target content element,
   * also hides other content elements if necessary
   * @param {Element} targetContentElement Target content element
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
   * Hides all content elements except the target element
   * @param {Element|null} targetContentElement Content element that should not be hidden
   */
  _hideAllContentElementsButTarget(targetContentElement) {
    for (let contentElement of this.contentElements) {
      if (contentElement !== targetContentElement) {
        contentElement.classList.add("is-hidden")
      }
    }
  }

  /**
   * Toggles the hidden state of a target title element
   * @param {number} index Title index to show/hide
   */
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

  /**
   *
   * @param {string} title Text for the new title element
   * @param {string} content Text for the new content element
   */
  insertNewTitleContentPair(title, content) {
    // Create new elements
    const dt = document.createElement("dt")
    dt.innerHTML = title
    dt.classList.add("Akkordeon-title")

    const dd = document.createElement("dl")
    dd.innerHTML = content
    dd.classList.add("Akkordeon-content")

    const newElementsIndex = this.titleElements.length

    // Update local state
    this.titleElements.push(dt)
    this.contentElements.push(dd)

    // Initialise nodes
    this._initialiseTitleElement(dt, dd, newElementsIndex)
    this._initialiseContentElement(dd, newElementsIndex)

    // Add elements to DOM tree
    this.containerElement.appendChild(dt)
    this.containerElement.appendChild(dd)
  }
}
