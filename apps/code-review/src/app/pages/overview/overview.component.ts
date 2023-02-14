import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MonacoEditorDirective } from './directives';

@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class OverviewComponent {
    @ViewChild(MonacoEditorDirective)
    private readonly codeEditor!: MonacoEditorDirective;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public readonly tree = [
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
                    content: [{ name: 'environment.prod.ts' }, { name: 'environment.ts' }]
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

    public onMonacoEditorReady(): void {
        // FIXME: Replace to real approach
        this.codeEditor.setValue('export const MY_CODE_HERE = "VALUE";\n');
    }
}
