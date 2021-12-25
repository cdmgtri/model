
let ejs = require("ejs");
let fs = require("fs-extra");
let { NamespaceDef, PropertyDef } = require("niem-model");

let Utils = require("./utils");

class Templates {

  /**
   * @param {string} viewPath
   * @param {string} outputPath
   * @param {object} data
   */
   static async build(viewPath, outputPath, data) {
    let template = await Templates.compile(viewPath);
    let html = await template(data);
    fs.outputFileSync(`output/${outputPath}`, html);
  }

  static async compile(viewPath) {
    let template = fs.readFileSync(`views/${viewPath}`, "utf-8");
    return ejs.compile(template, {
      async: true,
      views: ["views", "views/partials"]
    });
  }

  static async render(viewPath, data={}) {
    let template = await Templates.compile(viewPath);

    // Add helper functions
    data.functions = {
      componentLink: Templates.componentLink,
      namespaceLink: Templates.namespaceLink
    }

    return template(data);
  }

  /**
   * @param {string} outputPath
   * @param {{title: string, header: string, contents: string}} data
   */
  static async buildPage(outputPath, data) {
    await Templates.build("pages/index.ejs", outputPath, {...data, outputPath});
  }

  static componentLink(component) {
    return `${component.releaseKey}/${component.prefix}/${component.name}`;
  }

  static namespaceLink(namespace) {
    return `${namespace.releaseKey}/${namespace.prefix}`;
  }

  /**
   * @param {{label: string, open: string, items: string[]}} data
   */
  static async loadObjectList(data) {
    return Templates.render("partials/objectList.ejs", data);
  }

  /**
   * @param {PropertyDef} property
   */
  static async loadPropertyRow(property) {
    return Templates.render("partials/rowProperty.ejs", {property});
  }

  /**
   * @param {PropertyDef[]} properties
   */
  static async loadPropertyList(properties) {

    /** @type {string[]} */
    let contents = [];

    for (let property of properties) {
      let content = await Templates.loadPropertyRow(property);
      contents.push(content);
    }

    return Templates.loadObjectList({ label: "Properties", open: "open", items: contents });

  }

  /**
   * @param {{items: {label: string, value: string, url?: string}[]}} data
   */
  static async loadStackedTable(data) {
    let template = await Templates.compile("partials/stackedTable.ejs");
    return template(data);
  }

}

module.exports = Templates;
