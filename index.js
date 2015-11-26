'use strict';

var _ = require('lodash');

var prefixes = ['ms', 'Moz', 'Webkit', 'o'];

function applyPrefixesToProperty(property, propertyValue) {
  var newProperties = {};

  _.each(prefixes, function(prefixItem) {
    var newPropertyName = prefixItem + _.capitalize(property);
    newProperties[newPropertyName] = propertyValue;
  });

  return newProperties;
}

function applyPrefixesToEachProperty(styleObject, propertiesToPrefix) {
  return _.reduce(propertiesToPrefix, function(memo, propertyToPrefix) {
    return _.merge(memo, applyPrefixesToProperty(propertyToPrefix, styleObject[propertyToPrefix]))
  }, {});
}

function prefix(styleObject, propertiesToPrefix) {
  var objectWithPrefixesApplied = _.isArray(propertiesToPrefix)
  ? applyPrefixesToEachProperty(styleObject, propertiesToPrefix)
  : applyPrefixesToProperty(propertiesToPrefix, styleObject[propertiesToPrefix]);

  return _.merge(_.clone(styleObject), objectWithPrefixesApplied);
}

module.exports = prefix;
