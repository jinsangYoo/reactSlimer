/**
 * Checks if a JavaScript value is empty
 * @example
 *    isEmpty(null); // true
 *    isEmpty(undefined); // true
 *    isEmpty(''); // true
 *    isEmpty([]); // true
 *    isEmpty({}); // true
 * @param {any} value - item to test
 * @returns {boolean} true if empty, otherwise false
 */
export function isEmpty(value: any): boolean {
  return (
    value === null || // check for null
    value === undefined || // check for undefined
    value === '' || // check for empty string
    (Array.isArray(value) && value.length === 0) || // check for empty array
    (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
  )
}

export function isLetterAtStringStartIndex(value: string): boolean {
  const regex = /^[\w].*/
  return regex.test(value)
}

export function onlyLetteringAtStartIndex(value: string): string {
  if (!isEmpty(value)) {
    while (!isLetterAtStringStartIndex(value)) {
      value = value.substring(1)
      if (isEmpty(value)) {
        break
      }
    }
  }
  return value
}
