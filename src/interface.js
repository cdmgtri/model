
let Utils = require("./utils");
let templateText = Utils.loadTemplate();

class InterfaceHTML {

  /**
   * @param {string} releaseKey
   */
  constructor(releaseKey,) {
    this.releaseKey = releaseKey;
    this.title = "";
    this.header = "";
    this.outputPath = "";
  }

  async write() {
    let template = eval('`'+templateText+'`');
    Utils.saveFile(this.outputPath, template);
  }

  /**
   * Map file output path to breadcrumb items
   */
  getBreadcrumbItems() {

    let items = this.outputPath.replace("/index.html", "").split("/");
    let activeItem = `<li class="breadcrumb-item active">${items.pop()}</li>`;

    let parentItems = items.map( (item, index) => {
      let parentFolders = "../".repeat(index + 1);
      return `<li class="breadcrumb-item"><a href="${parentFolders}">${item}</a></li>` ;
    })

    return [...parentItems, activeItem];
  }

  getContents() {

  }

  getAssets() {
    let parentDirs = "../".repeat(this.outputPath.split('/').length - 1);
    return `${parentDirs}assets`;
  }

}

module.exports = InterfaceHTML
