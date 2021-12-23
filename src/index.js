
let ReleaseHTML = require("./release");
let Utils = require("./utils");

class NIEM_HTML {

  constructor() {
  }

  /**
   * @param {string} releaseKey
   */
  static async generatePages(releaseKey) {

    let start = Date.now();
    Utils.copyAssets();

    let releaseHTML = new ReleaseHTML(releaseKey);
    await releaseHTML.init();
    await releaseHTML.write();

    console.log(`Release ${releaseKey} HTML pages generated in ${(Date.now() - start) / 1000} seconds.`)

  }

}

NIEM_HTML.generatePages("5.1");

module.exports = NIEM_HTML;
