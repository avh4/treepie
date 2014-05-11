module.exports = function(string) {
  if (string === '') return [];
  var lasts = [{children: []}];
  string.trim().split(/\n+/).forEach(function(e) {
    var spaces = e.match(/^ */)[0].length;
    lasts[spaces+1] = { name: e.trim(), children: []};
    lasts[spaces].children.push(lasts[spaces+1]);
  });
  return lasts[0].children;
};