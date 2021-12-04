const fs = require('fs');
const path = require('path');

const fsPromise = fs.promises;
const AdmZip = require('adm-zip');

class ZipParser {
  constructor() {
    this.path = path;
    this.AdmZip = AdmZip;
    this.fsPromise = fsPromise;
    this.parseZip = this.parseZip.bind(this);
  }

  async parseZip(usersPdfPath, zipName) {
    const zip = new this.AdmZip();

    for (const userPdfPath of usersPdfPath) {
      zip.addLocalFile(userPdfPath);
    }

    const zipBuffer = await zip.toBuffer();

    const zipPath = this.path.resolve(`./files/cv/${zipName}`);

    await this.fsPromise.writeFile(zipPath, zipBuffer);
  }
}

module.exports = new ZipParser();
