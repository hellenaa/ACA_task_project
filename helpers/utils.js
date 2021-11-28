const fs = require('fs');
const crypto = require('crypto');

const fsPromise = fs.promises;
const config = require('../config');

class Utils {
  constructor() {
    this.crypto = crypto;
    this.fsPromise = fsPromise;
  }

  generateToken() {
    return `${this.crypto.randomBytes(config.crypto.tokenLength).toString('hex')}${(new Date().getTime())}`;
  }

  async deleteFiles(paths) {
    if (paths && paths.length !== 0) {
      for (let i = 0; i < paths.length; i++) {
        await this.fsPromise.unlink(paths[i]);
      }
    }
  }
}

const UtilsInstance = new Utils();
module.exports = UtilsInstance;
