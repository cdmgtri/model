
module.exports.componentLink = function(component) {
  return `${component.releaseKey}/${component.prefix}/${component.name}`;
}

module.exports.namespaceLink = function(namespace) {
  return `${namespace.releaseKey}/${namespace.prefix}`;
}
