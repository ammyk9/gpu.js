function imageToArray(image) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  document.body.appendChild(canvas);
  document.body.appendChild(image);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const { data } = ctx.getImageData(0, 0, image.width, image.height);
  document.body.removeChild(canvas);
  document.body.removeChild(image);
  let i = 0;
  const result = [];
  for (let y = 0; y < image.height; y++) {
    const row = [];
    result.unshift(row);
    for (let x = 0; x < image.width; x++) {
      const pixel = new Float32Array([
        data[i++],
        data[i++],
        data[i++],
        data[i++],
      ]);
      row.push(pixel);
    }
  }
  return result;
}

function loadImage(image) {
  return new Promise((resolve) => {
    image.onload = () => {
      resolve(image);
    };
  });
}

function check2DImage(result, expected, channel) {
  const height = result.length;
  const width = result[0].length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (result[y][x] !== expected[y][x][channel]) {
        throw new Error(`result[${y}][${x}] value does not match expected value of ${expected[y][x][channel]}`);
      }
    }
  }
  return true;
}

const _exports = {
  imageToArray,
  loadImage,
  check2DImage,
};

if (typeof window !== 'undefined') {
  window.browserTestUtils = _exports;
} else {
  module.exports = _exports;
}

