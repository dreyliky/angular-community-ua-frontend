/* eslint-disable */
export default {
    displayName: 'assets',
    preset: '../../jest.preset.js',
    globals: {},
    transform: {
        '^.+\\.[tj]sx?$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json'
            }
        ]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/libs/assets'
};
