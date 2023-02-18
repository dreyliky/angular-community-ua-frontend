const { withModuleFederation } = require('@nrwl/angular/module-federation');
const config = require('./module-federation.config');

module.exports = withModuleFederation({
    ...config,
    remotes: [['code-review', 'http://localhost:4201']]
});
