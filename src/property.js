
let { NIEM, ReleaseDef, NamespaceDef, Namespace, LocalTermDef, PropertyDef, TypeDef } = require("niem-model");

let Templates = require("./templates");
let Utils = require("./utils");

class PropertyHTML {

  /**
   * @param {string} releaseKey
   */
  constructor(releaseKey) {
    this.releaseKey = releaseKey;
  }

  async init() {
  }

  /**
   * @TODO Rename write() as page()
   * @param {PropertyDef} property
   */
  async write(property) {

    let contents = "";

    contents += await Templates.loadStackedTable({items: [
      { label: "Definition", value: property.definition},
      { label: "Prefix", value: property.prefix},
      { label: "Style", value: property.style},
      // { label: "URI", value: property.uri, url: property.uri}
    ]});

    await Templates.buildPage(`${this.releaseKey}/${property.prefix}/index.html`, {
      title: property.prefix,
      header: `Namespace ${property.prefix}`,
      contents
    });

  }

}

module.exports = PropertyHTML;
