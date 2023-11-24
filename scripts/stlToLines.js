// Helper script to convert ASCII STL models into a JS file
// The lines model JS is simply an array of 3D vertices, with every two vertices describing a line
// Normals are ignored in the lines model format
//
// The script can be used in the following manner:
//   node stlToLines.js input.stl output.js

const fs = require('fs').promises;

(async () => {
  const [, , inputStlPath, outputJsPath] = process.argv;

  const stlString = await fs.readFile(inputStlPath, { encoding: 'utf-8' });

  const triangles = stlString.matchAll(
    /outer loop\nvertex (-?\d*\.?\d+) (-?\d*\.?\d+) (-?\d*\.?\d+)\nvertex (-?\d*\.?\d+) (-?\d*\.?\d+) (-?\d*\.?\d+)\nvertex (-?\d*\.?\d+) (-?\d*\.?\d+) (-?\d*\.?\d+)\nendloop/g
  );

  const lines = [];

  for (const match of triangles) {
    const floatPoints = match
      .slice(1, 10)
      .map((pointString) => parseFloat(pointString));
    const point1 = [floatPoints[0], floatPoints[1], floatPoints[2]];
    const point2 = [floatPoints[3], floatPoints[4], floatPoints[5]];
    const point3 = [floatPoints[6], floatPoints[7], floatPoints[8]];

    lines.push(...point1, ...point2);
    lines.push(...point2, ...point3);
    lines.push(...point1, ...point3);
  }

  // In practice this would likely be larger without gzip compression
  //   // eslint-disable-next-line no-undef
  //   const outputArray = new Float32Array(lines);

  //   await fs.writeFile(outputBinPath, outputArray);

  const outputJs = `export const points = new Float32Array([${lines}]);`;

  await fs.writeFile(outputJsPath, outputJs);
})();
