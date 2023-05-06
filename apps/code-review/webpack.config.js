const { withModuleFederation } = require('@nx/angular/module-federation');
const moduleFederationConfig = require('./module-federation.config');

module.exports = withModuleFederation(moduleFederationConfig);
