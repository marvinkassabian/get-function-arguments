/**
 * @param {Function} fn
 */
export default (fn) => {
  const FN_ARGS = /^\s*[^\(]*\(\s*([^\)]*)\)/m;
  const FN_ARG_SPLIT = /[,\s]+/;
  const FN_ARG = /^(\$[a-zA-Z0-9_]+)/;
  const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;

  if (typeof fn !== "function" || !fn.length) {
    console.log("not a function", fn);
    return [];
  }
  const fnText = fn.toString();
  const strippedFnText = fnText.replace(STRIP_COMMENTS, "");
  const matches = strippedFnText.match(FN_ARGS);
  const argNames = matches[1].split(FN_ARG_SPLIT);
  console.log("argNames", argNames);
  const filteredArgNames = argNames.filter((argName) => FN_ARG.test(argName)).map((argName) => argName.match(FN_ARG)[1]);
  console.log("filteredArgNames", filteredArgNames);
  return filteredArgNames;
};
