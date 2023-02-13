const { composePlugins } = require('@nrwl/webpack');
const { withModuleFederation } = require('@nrwl/angular/module-federation');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const moduleFederationConfig = require('./module-federation.config');

module.exports = composePlugins(
    withModuleFederation(moduleFederationConfig),
    (config) => {
        return {
            ...config,
            plugins: [
                ...config.plugins,
                new MonacoWebpackPlugin()
            ],
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader']
                    },
                    {
                        test: /\.ttf$/,
                        use: ['file-loader']
                    }
                ]
            }
        };
    }
);
