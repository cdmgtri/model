
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
    return ejs.compile(template, {async: true});
  }

  /**
   * @param {string} outputPath
   * @param {{title: string, header: string, contents: string}} data
   */
  static async buildPage(outputPath, data) {
    await Templates.build("pages/index.ejs", outputPath, {...data, outputPath});
  }

  /**
   * @param {{items: string[]}} data
   */
  static async loadObjectList(data) {
    let template = await Templates.compile("partials/objectList.ejs");
    return template(data);
  }

  /**
   * @param {PropertyDef} property
   */
  static async loadPropertyRow(property) {
    let template = await Templates.compile("partials/rowProperty.ejs");
    return template({property});
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

    return Templates.loadObjectList({ items: contents });

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
