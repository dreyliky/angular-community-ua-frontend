export const FILE_TREE_ARRAY = [
    {
        name: '.vscode',
        content: [{ name: 'settings.json' }]
    },
    {
        name: 'src',
        content: [
            {
                name: 'app',
                content: [
                    { name: 'app.component.html' },
                    { name: 'app.component.css' },
                    { name: 'app.component.spec.ts' },
                    { name: 'app.component.ts' },
                    { name: 'app.module.ts' }
                ]
            },
            {
                name: 'assets',
                content: [{ name: '.gitkeep' }]
            },
            {
                name: 'environments',
                content: [
                    { name: 'environment.prod.ts' },
                    { name: 'environment.ts' }
                ]
            },
            {
                name: 'favicon.ico'
            },
            {
                name: 'index.html'
            },
            {
                name: 'main.ts'
            },
            {
                name: 'polyfill.ts'
            },
            {
                name: 'styles.css'
            }
        ]
    },
    {
        name: 'angular.json'
    },
    {
        name: 'package-lock.json'
    },
    {
        name: 'package.json'
    },
    {
        name: 'tsconfig.json'
    }
];
