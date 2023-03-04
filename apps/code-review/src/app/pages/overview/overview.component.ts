import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SourceCodeApi } from './apis';
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
    public readonly tree$ = this.sourceCodeApi.get('https%3A%2F%2Fgithub.com%2Fdreyliky%2Fangular-community-ua-backend');

    constructor(
        private sourceCodeApi: SourceCodeApi
    ) {}

    public onMonacoEditorReady(): void {
        // FIXME: Replace to real approach
        this.codeEditor.setValue('export const MY_CODE_HERE = "VALUE";\n');
    }
}
