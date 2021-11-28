const fs = require('fs');

const fsPromise = fs.promises;
const Handlebars = require('handlebars');
const config = require('../config');

class HtmlParser {
  async parseHtml(users) {
    const source = await fsPromise.readFile(config.cvTemplate);
    const template = Handlebars.compile(`${source}`);

    const usersHtml = [];

    for (const user of users) {
      const result = template(user);
      usersHtml.push(result);
    }

    return usersHtml;
  }
}

const HtmlParserInstance = new HtmlParser();
module.exports = HtmlParserInstance;
