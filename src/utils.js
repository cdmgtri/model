
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

  /**
   * Returns a two-column table with labels on the left and values on the right
   *
   * @param {{label: string, value: string, url?: string}[]} items
   */
  static stackedTable(items) {

    let rows = items.map( item => {

      // Set up an external link if a url has been provided
      let url = item.url ? `<a href="${item.value}" target="_blank"> <i class="fa fa-external-link"></i> </a>` : "";

      return `
        <tr>
          <td class="stacked-table-label">${item.label}</td>
          <td class="stacked-table-value">
            <span class="copy" data-toggle="popover" title="Copied!" data-placement="right">${item.value}</span>
            ${url}
          </td>
        </tr>
      `;
    });

    return `
      <div class="card">
        <table class="table table-sm">
          ${rows.join("\n")}
        </table>
      </div>
    `;
  }

}

module.exports = Utils;
