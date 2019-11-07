/**
 * Tests an object to see if it has Element as its prototype
 * @param {Object} element Object to test
 */
export function isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument
}
