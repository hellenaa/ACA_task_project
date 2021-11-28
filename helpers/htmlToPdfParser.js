const fs = require('fs');
const path = require('path');

const fsPromise = fs.promises;
const htmlToPdf = require('html-pdf-node');
const Utils = require('./utils');

class HtmlToPdfParser {
  constructor() {
    this.path = path;
    this.utils = Utils;
    this.htmlToPdf = htmlToPdf;
    this.fsPromise = fsPromise;
  }

  async parsePdf(usersHtml) {
    const usersPdfPath = [];
    const options = { format: 'A4', margin: { left: 100 } };

    for (const userHtml of usersHtml) {
      const file = { content: userHtml };

      const pdfBuffer = await this.htmlToPdf.generatePdf(file, options);

      const tempPdfName = `${this.utils.generateToken()}.pdf`;

      const tempPdfPath = this.path.resolve(`./files/temp/${tempPdfName}`);

      await this.fsPromise.writeFile(tempPdfPath, pdfBuffer);

      usersPdfPath.push(tempPdfPath);
    }

    return usersPdfPath;
  }
}

const HtmlToPdfParserInstance = new HtmlToPdfParser();
module.exports = HtmlToPdfParserInstance;
