export function isArray(o) {
  return !!o && typeof o === "object" && o.length !== undefined;
}
export function isPlainObject(value) {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    } else {
        var prototype = Object.getPrototypeOf(value);
        return prototype === null || prototype === Object.prototype;
    }
}
export function objectIsEmpty(obj) {
  if (typeof obj === "object") {
    if (Object.getOwnPropertyNames(obj).length > 0) {
      return false;
    } else {
      return true;
    }
  } else if (typeof obj === 'undefined') {
    return undefined;
  }
}
export function isArrayAndContainsValues(array) {
  let contains = false;

  if (array) {
    if (isArray(array)) {
      if (array.length) {
        contains = true;
      } else {
        contains = false;
      }
    } else {
      contains = false;
    }
  } else {
    contains = false;
  }

  return contains;
}
export function isObjectPlainAndContainsValues(obj) {
  let contains = false;

  if (obj) {
    if (isPlainObject(obj)) {
      if (objectIsEmpty(obj)) {
        contains = false;
      } else {
        contains = true;
      }
    } else {
      contains = false;
    }
  } else {
    contains = false;
  }

  return contains;
}
