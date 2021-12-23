
let fs = require("fs-extra");
let { NIEM, ReleaseDef, NamespaceDef, Namespace, PropertyDef, TypeDef } = require("niem-model");

let InterfaceHTML = require("./interface");
let NamespaceHTML = require("./namespace");
let Utils = require("./utils");

class ReleaseHTML extends InterfaceHTML {

  /**
   * @param {string} releaseKey
   */
  constructor(releaseKey) {

    super(releaseKey);

    this.title = `NIEM ${releaseKey}`;
    this.header = `Release ${releaseKey}`;
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
    await super.write();

    await NamespaceHTML.writeList(this.namespaces);

    // namespaces
    // properties
    // types

  }

  getContents() {

    let contents = "";

    // Release resources
    contents += `<p>See the <a href="https://niem.github.io/niem-releases/${this.releaseKey}/">${this.releaseKey} release page</a> for links to the release package, artifacts, and tools.</p>`;

    // Namespaces heading
    contents += `<p><strong>Namespaces in this release</strong> <span class="badge badge-info">${this.namespaces.length}</span></p>`;

    // Get a unique list of namespace styles in this release
    let namespaceStyles = [...new Set( this.namespaces.sort(Namespace.sortByStyle).map( ns => ns.style ) )];

    for (let namespaceStyle of namespaceStyles) {
      let filteredNamespaces = this.namespaces.filter( namespace => namespace.style == namespaceStyle );

      let rows = filteredNamespaces.map( ns => {
        return `
          <tr class="ns">
            <td class="ns-prefix font-weight-bold"><a href="${ns.prefix}">${ns.prefix}</a></td>
            <td class="ns-def">${ns.definition}</td>
          </tr>
        `;
      });

      let open = namespaceStyle == "core" || namespaceStyle == "domain" ? "open" : "";

      contents += `
        <details ${open}>
          <summary>
            ${Utils.capitalizeFirstLetter(namespaceStyle)}
            <span class='badge badge-info'>${filteredNamespaces.length}</span>
          </summary>

          <table class='table table-hover table-sm'>
            ${rows.join("\n")}
          </table>
        </details>
      `;
    }

    return contents;

  }

}

module.exports = ReleaseHTML;
