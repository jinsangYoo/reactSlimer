export function mapValueObjectToObject(map: Map<string, object>) {
  return Array.from(map).reduce((obj, [key, value]) => {
    obj[key] = value
    return obj
  }, {})
}

export function mapValueStringToObject(map: Map<string, string>) {
  return Array.from(map).reduce((obj, [key, value]) => {
    obj[key] = value
    return obj
  }, {})
}
