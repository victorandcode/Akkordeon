/**
 * Gets a random integer between two values
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 */
export function getRandomInt(min = 0, max = 100000) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
