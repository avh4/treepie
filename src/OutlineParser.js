var ItemParser = require('./ItemParser');

module.exports = function(string) {
  if (string === '') return [];
  var lasts = [{children: []}];
  string.trim().split(/\n+/).forEach(function(e) {
    var spaces = e.match(/^ */)[0].length;
    lasts[spaces+1] = ItemParser(e.trim());
    lasts[spaces+1].children = [];
    lasts[spaces].children.push(lasts[spaces+1]);
  });
  return lasts[0].children;
};

function _reverse(depth, parent) {
  var indent = '';
  for (var i = 0; i < depth; i++) {
    indent += ' ';
  }
  var children = parent.children.map(function(child) {
    return _reverse(depth + 1, child);
  }).join('');
  return '\n' + indent + parent.name + children;
}

module.exports.reverse = function(data) {
  return data.map(function(d) {
    return _reverse(0, d);
  }).join('').trim();
};