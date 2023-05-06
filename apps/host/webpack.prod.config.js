const { withModuleFederation } = require('@nx/angular/module-federation');
const config = require('./module-federation.config');

module.exports = withModuleFederation({
    ...config,
    remotes: [['code-review', 'https://acua-code-review.web.app']]
});
