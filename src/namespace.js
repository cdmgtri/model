
let { NIEM, ReleaseDef, NamespaceDef, Namespace, LocalTermDef, PropertyDef, TypeDef } = require("niem-model");

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
    this.properties = await this.namespace.properties.find();
    this.types = await this.namespace.types.find();
    this.localTerms = await this.namespace.localTerms.find();
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

    contents += this.getProperties();

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

  getProperties() {

    return `
      <details>
        <summary>
          <strong>Properties</strong>
          <span class="badge badge-info badge-pill">${"#"}</span>
        </summary>
      </details>
    `;

  }

  /**
   * @param {PropertyDef} property
   */
  getPropertyRow(property) {

    let typeInfo = "";
    if (property.isAbstract) {
      typeInfo = "(abstract)";
    }

    return `
      <strong><a href="${Utils.niemObjectLink(property)}">${ property.qname }</a></strong>

      <small>
        <!-- (type qname) -->
        <span v-if="property.typeQName">
          (type <b-link :to="typeRoute">{{ property.typeQName }}</b-link>)
        </span>

        <!-- (abstract) [substitution count badge] -->
        <span v-else>
          <span> (abstract)</span>
          <b-badge v-if="substitutions.length > 0" variant="secondary" pill>
            {{ substitutions.length }} substitution<span v-if="substitutions.length>1">s</span>
          </b-badge>
        </span>
      </small>
    `
  }

}

module.exports = NamespaceHTML;
