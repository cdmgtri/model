
let { NIEM, ReleaseDef, NamespaceDef, Namespace, LocalTermDef, LocalTerm, Component, PropertyDef, TypeDef } = require("niem-model");

let Templates = require("./templates");
let Utils = require("./utils");

class NamespaceHTML {

  /**
   * @TODO Use the release key to determine the correct version of NIEM XSD and other classes to use
   *
   * @param {NamespaceDef} namespace
   */
  constructor(namespace) {

    this.releaseKey = namespace.releaseKey;

    this.namespace = namespace;

    /** @type {ReleaseDef} */
    this.release = namespace.release;

    /** @type{PropertyDef[]} */
    this.properties = [];

    /** @type{TypeDef[]} */
    this.types = [];

    /** @type{LocalTermDef[]} */
    this.localTerms = [];

  }

  async init() {
    this.properties = (await this.namespace.properties.find()).sort(Component.sortByName);
    this.types = (await this.namespace.types.find()).sort(Component.sortByName);
    this.localTerms = (await this.namespace.localTerms.find()).sort(LocalTerm.sortByTerm);
  }

  async write() {

    let contents = "";

    contents += await Templates.loadStackedTable({items: [
      { label: "Definition", value: this.namespace.definition},
      { label: "Prefix", value: this.namespace.prefix},
      { label: "File name", value: this.namespace.fileName},
      { label: "Style", value: this.namespace.style},
      { label: "URI", value: this.namespace.uri, url: this.namespace.uri}
    ]});

    contents += await Templates.loadPropertyList(this.properties);

    await Templates.buildPage(`${this.releaseKey}/${this.namespace.prefix}/index.html`, {
      title: this.namespace.prefix,
      header: `Namespace ${this.namespace.prefix}`,
      contents
    });

  }

  /**
   * @param {NamespaceDef[]} namespaces
   */
   static async writeList(namespaces) {
    for (let namespace of namespaces) {
      let namespaceHTML = new NamespaceHTML(namespace);
      await namespaceHTML.init();
      await namespaceHTML.write();
    }
  }

}

module.exports = NamespaceHTML;
