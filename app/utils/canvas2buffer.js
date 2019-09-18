const { nativeImage } = require('electron');

const types = ['image/png', 'image/jpg', 'image/jpeg'];

function canvas2Buffer(path, type = 'image/jpeg', quality = 0.9) {
  if (types.indexOf(type) === -1) {
    throw new Error(`unsupported image type ${type}`);
  }

  // const data = canvas.toDataURL(type, quality)
  const image = nativeImage.createFromPath(path);
  if (/^image\/jpe?g$/.test(type)) {
    return image.toJPEG(quality * 100);
  }
  return image.toPNG();
}

export default canvas2Buffer;
