
let fs = require("fs-extra");
let { NIEM, ReleaseDef, NamespaceDef, Namespace, PropertyDef, TypeDef } = require("niem-model");

let NamespaceHTML = require("./namespace");
let Templates = require("./templates");

class ReleaseHTML {

  /**
   * @param {string} releaseKey
   */
  constructor(releaseKey) {

    this.releaseKey = releaseKey;

    this.outputPath = `${releaseKey}/index.html`;

    this.niem = new NIEM();

    /** @type {ReleaseDef} */
    this.release;

    /** @type {NamespaceDef[]} */
    this.namespaces = [];

    /** @type {PropertyDef[]} */
    this.properties = [];

    /** @type {TypeDef[]} */
    this.types = [];

  }

  async init() {
    // Load release
    let json = fs.readFileSync(`data/niem-${this.releaseKey}-release.json`, "utf-8");
    await this.niem.load(json);
    this.release = await this.niem.releases.get("niem", "model", this.releaseKey);

    // Load content from the release
    this.namespaces = await this.release.namespaces.find();
    this.properties = await this.release.properties.find();
    this.types = await this.release.types.find();

    // Clear current release HTML pages
    // await Utils.clearOutputReleaseFolder(this.releaseKey);
  }

  async write() {

    // Get a unique list of namespace styles in this release
    let namespaceStyles = [...new Set( this.namespaces.sort(Namespace.sortByStyle).map( ns => ns.style ) )];

    let contents = await ReleaseHTML.loadPartial_ReleaseContents({
      releaseKey: this.releaseKey,
      namespaces: this.namespaces,
      namespaceStyles
    });

    await Templates.buildPage(`${this.releaseKey}/index.html`, {
      title: `NIEM ${this.releaseKey}`,
      header: `Release ${this.releaseKey}`,
      contents: contents
    });

    await NamespaceHTML.writeList(this.namespaces);

    // namespaces
    // properties
    // types

  }

  /**
   * @param {{releaseKey: string, namespaces: NamespaceDef[], namespaceStyles: string[]}} data
   */
  static async loadPartial_ReleaseContents(data) {
    let template = await Templates.compile("partials/releaseContents.ejs");
    return template(data);
  }

}

module.exports = ReleaseHTML;
