const config = require('../config');
const messages = require('../config/messages');

class PermissionHandler {
  checkDomain(req, res, next) {
    try {
      if (!req.headers.origin || !req.headers.origin.match(config.whiteList.origin)) {
        throw new Error(messages.wrongDomain);
      }
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new PermissionHandler();
