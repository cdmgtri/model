
let { NIEM, ReleaseDef, NamespaceDef, Namespace, LocalTermDef, PropertyDef, TypeDef } = require("niem-model");

let Utils = require("./utils");

class Partials {

  /**
   * @param {PropertyDef} property
   */
  static async propertyRow(property) {

    let summary = "";
    let contents = "";

    if
    if (property.isAbstract) {
      summary = "(abstract)";
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

    return Partials.objectRow(summary, property.definition, contents);

  }

  static async objectRow(summary, definition, contents) {
    return `
      <div class="card>
        <details>
          <summary>${summary}</summary>
          <div class="object-summary">
            <p class="copy">${definition}</p>
            ${contents}
          </div>
        </details>
      </div>
    `;
  }

  /**
   * @param {string[]} rows
   */
  static async objectList(rows) {
    return `
      <ul class="list-group">
        ${rows.join("\n")}
      </ul>
    `;
  }

}

/**
 * @param {PropertyDef} property
 */
async function propertyAbstractRow(property) {

  // Get all substitutable properties for the given property
  let substitutions = await property.substitutions();

  // PropertyName (abstract) <badge with substitution count>
  let badge = substitutions.length > 0 ? <span class="badge badge-secondary">${substitutions.length}</span> : "";
  let summary = `<strong>${property.name}</strong> <small>(abstract) ${badge}</small>`;

  let contents = "";

  if (substitutions.length > 0) {

    contents = ``;

    for (let substitution of substitutions) {

    }
  }


  if
  if (property.isAbstract) {
    summary = "(abstract)";
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

  return Partials.objectRow(summary, property.definition, contents);

}

module.exports = Partials;
