
let fs = require("fs-extra");
let { execSync } = require("child_process");
let { NamespaceDef, Namespace, PropertyDef, Property, TypeDef, Type } = require("niem-model");

class Utils {

  /**
   * Send release HTML files in the output directory to the trash / recycle bin
   * @param {string} releaseKey
   */
  static clearOutputReleaseFolder(releaseKey) {
    execSync(`trash output/${releaseKey}`);
  }

  static copyAssets() {
    Utils.clearOutputReleaseFolder("assets");
    fs.copySync("templates/assets", "output/assets");
  }

  /**
   * @TODO: Remove
   * @param {NamespaceDef|PropertyDef|TypeDef} niemObject
   */
  static niemObjectLink(niemObject) {

    let releaseKey = niemObject.releaseKey;

    if (niemObject instanceof Namespace) {
      return `${releaseKey}/${niemObject.prefix}`;
    }
    else {
      return `${releaseKey}/${niemObject.prefix}/${niemObject.name}`;
    }
  }

  /**
   * @param {string} relativePath - Full path starting under the output directory
   * @param {string} data
   */
  static saveFile(relativePath, data) {
    fs.outputFileSync(`output/${relativePath}`, data);
  }

}

module.exports = Utils;
