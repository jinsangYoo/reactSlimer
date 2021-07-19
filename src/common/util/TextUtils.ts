export function isEmpty(value: string | undefined): boolean {
  if (Boolean(value)) {
    return true
  } else {
    return false
  }
}
