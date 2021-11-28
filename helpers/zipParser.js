const fs = require('fs');
const path = require('path');

const fsPromise = fs.promises;
const AdmZip = require('adm-zip');

class ZipParser {
  constructor() {
    this.path = path;
    this.admZip = AdmZip;
    this.fsPromise = fsPromise;
  }

  async parseZip(usersPdfPath, zipName) {
    const zip = new this.admZip();

    for (const userPdfPath of usersPdfPath) {
      zip.addLocalFile(userPdfPath);
    }

    const zipBuffer = await zip.toBuffer();

    const zipPath = this.path.resolve(`./files/cv/${zipName}`);

    await this.fsPromise.writeFile(zipPath, zipBuffer);
  }
}

const ZipParserInstance = new ZipParser();
module.exports = ZipParserInstance;
