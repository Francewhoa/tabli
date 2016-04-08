/**
 * Object merge operator from the original css-in-js presentation
 */
export function merge() {
  var res = {};
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      Object.assign(res, arguments[i]);
    } else {
      if (typeof (arguments[i]) === 'undefined') {
        throw new Error('m(): argument ' + i + ' undefined');
      }
    }
  }

  return res;
}

/*
 * sort criteria for window list:
 *   open windows first, then alpha by title
 */
export function windowCmp(currentWindowId) {
  const cf = (tabWindowA, tabWindowB) => {
    /*
      We used to sort with focused window very first:
      if (tabWindowA.open && tabWindowA.openWindowId == currentWindowId)
        return -1;
      if (tabWindowB.open && tabWindowB.openWindowId === currentWindowId)
        return 1;
    */

    // open windows first:
    if (tabWindowA.open !== tabWindowB.open) {
      if (tabWindowA.open) {
        return -1;
      }
      return 1;
    }

    var tA = tabWindowA.title;
    var tB = tabWindowB.title;
    const ret = tA.localeCompare(tB, navigator.language, { sensitivity: "base" });
    return ret;
  }
  return cf;
}