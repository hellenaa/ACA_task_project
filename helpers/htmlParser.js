const fs = require('fs');
const Handlebars = require('handlebars');
const config = require('../config');

class HtmlParser {
  constructor() {
    this.handlebars = Handlebars;
    this.fsPromise = fs.promises;
    this.parseHtml = this.parseHtml.bind(this);
  }

  async parseHtml(users) {
    const source = await this.fsPromise.readFile(config.cvTemplate);
    const template = this.handlebars.compile(`${source}`);

    const usersHtml = [];

    for (const user of users) {
      const result = template(user);
      usersHtml.push(result);
    }

    return usersHtml;
  }
}

module.exports = new HtmlParser();
