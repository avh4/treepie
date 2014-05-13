function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

exports.arc = function (x, y, radius, startDegrees, endDegrees) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(" ");
};

exports.annularSector = function (cx, cy, r1, r2, startRadians, endRadians) {
  var p = [
    [cx + r2 * Math.cos(startRadians),
     cy + r2 * Math.sin(startRadians)],
    [cx + r2 * Math.cos(endRadians),
     cy + r2 * Math.sin(endRadians)],
    [cx + r1 * Math.cos(endRadians),
     cy + r1 * Math.sin(endRadians)],
    [cx + r1 * Math.cos(startRadians),
     cy + r1 * Math.sin(startRadians)],
  ];

  var angleDiff = endRadians - startRadians;
  var largeArc = (angleDiff % (Math.PI * 2)) > Math.PI ? 1 : 0;
  return [
    "M" + p[0].join(),
    "A" + [r2, r2, 0, largeArc, 1, p[1]].join(),
    "L" + p[2].join(),
    "A" + [r1, r1, 0, largeArc, 0, p[3]].join(),
    "L" + p[0].join(),
    ].join(' ');
};
