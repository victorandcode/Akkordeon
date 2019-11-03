const DEFAULT_DURATION = 700

/**
 *
 * @param {HTMLElement} element
 * @param {number} duration
 */
export const slideUp = (element, duration = DEFAULT_DURATION) => {
  element.style.transitionProperty = "height, margin, padding"
  element.style.transitionDuration = duration + "ms"
  element.style.boxSizing = "border-box"
  element.style.overflow = "hidden"
  element.style.height = 0
  element.style.paddingTop = 0
  element.style.paddingBottom = 0
  element.style.marginTop = 0
  element.style.marginBottom = 0
  // Once animation ends, remove temporal properties and just make element invisible
  window.setTimeout(() => {
    element.style.display = "none"
    element.style.removeProperty("height")
    element.style.removeProperty("padding-top")
    element.style.removeProperty("padding-bottom")
    element.style.removeProperty("margin-top")
    element.style.removeProperty("margin-bottom")
    element.style.removeProperty("overflow")
    element.style.removeProperty("transition-duration")
    element.style.removeProperty("transition-property")
  }, duration)
}

export const slideDown = (element, duration = DEFAULT_DURATION) => {
  element.style.removeProperty("display")
  let display = window.getComputedStyle(element).display

  if (display === "none") display = "block"

  element.style.display = display
  let height = element.offsetHeight
  element.style.overflow = "hidden"
  element.style.height = 0
  element.style.paddingTop = 0
  element.style.paddingBottom = 0
  element.style.marginTop = 0
  element.style.marginBottom = 0
  element.offsetHeight
  element.style.boxSizing = "border-box"
  element.style.transitionProperty = "height, margin, padding"
  element.style.transitionDuration = duration + "ms"
  element.style.height = height + "px"
  element.style.removeProperty("padding-top")
  element.style.removeProperty("padding-bottom")
  element.style.removeProperty("margin-top")
  element.style.removeProperty("margin-bottom")
  window.setTimeout(() => {
    element.style.removeProperty("height")
    element.style.removeProperty("overflow")
    element.style.removeProperty("transition-duration")
    element.style.removeProperty("transition-property")
  }, duration)
}
