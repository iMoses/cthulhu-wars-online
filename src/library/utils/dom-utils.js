export function dataAttr(condition, value = '', defaultValue = null) {
  return condition ? value : defaultValue;
}
