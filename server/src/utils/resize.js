const sharp = require('sharp');
const uuidv4 = require('uuid');
const path = require('path');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }

  async resize(buffer) {
    const resizedBuffer = await sharp(buffer)
      .resize(300, 300, { // size image 300x300
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
    
    return resizedBuffer
  }
  
  static filename() {
     // random file name
    return `1234.png`;
  }
  filepath(filename) {
    return path.resolve(`D:/001-HocTap/Project/bankingBE/src/public/images`)
  }
}
module.exports = Resize;