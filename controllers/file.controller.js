const fs = require('fs');
const path = require('path');

const fsPromise = fs.promises;
const Utils = require('../helpers/utils');
const messages = require('../config/messages');
const ZipParser = require('../helpers/zipParser');
const HtmlParser = require('../helpers/htmlParser');
const EventHandler = require('../helpers/eventHandler');
const HtmlToPdfParser = require('../helpers/htmlToPdfParser');

class FileController {
  constructor() {
    this.path = path;
    this.utils = Utils;
    this.zipParser = ZipParser;
    this.fsPromise = fsPromise;
    this.htmlParser = HtmlParser;
    this.htmlToPdfParser = HtmlToPdfParser;
    this.createCVs = this.createCVs.bind(this);
    this.getCVs = this.getCVs.bind(this);
  }

  async createCVs(req, res, next) {
    try {
      const { users } = req.body;

      const zipName = `${this.utils.generateToken()}.zip`;

      res.send({ fileName: zipName, message: messages.inProgress });

      const usersHtml = await this.htmlParser.parseHtml(users);

      const usersPdfPath = await this.htmlToPdfParser.parsePdf(usersHtml);

      await this.zipParser.parseZip(usersPdfPath, zipName);

      EventHandler.completeCVCreation(req.app.io);

      await this.utils.deleteFiles(usersPdfPath);
    } catch (err) {
      EventHandler.failCVCreation(req.app.io);
      next(err);
    }
  }

  async getCVs(req, res, next) {
    try {
      if (!req.query.name) {
        throw new Error(messages.requiredName);
      }

      const zipPath = this.path.resolve(`./files/cv/${req.query.name}`);

      const zip = await this.fsPromise.readFile(zipPath);

      res.send(zip);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FileController();
