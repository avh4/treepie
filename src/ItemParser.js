module.exports = function(string) {
  var m = string.match(/^(.*?)((\d+)\/(\d+))?$/);
  if (m[2]) {
    return {name: m[1].trim(), score: m[2], percent: eval(m[2])};
  } else {
    return {name: string};
  }
}