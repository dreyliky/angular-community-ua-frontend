module.exports = {
  name: 'host',
  remotes: ['code-review'],
  additionalShared: [
    ['@acua/shared', { singleton: true, requiredVersion: '>=1.0.0 <1.1.1', strictVersion: true }]
  ]
};
