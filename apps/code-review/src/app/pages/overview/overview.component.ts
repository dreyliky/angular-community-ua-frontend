import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FILE_TREE_ARRAY } from './data';
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
    public readonly tree = FILE_TREE_ARRAY;

    public onMonacoEditorReady(): void {
        // FIXME: Replace to real approach
        this.codeEditor.setValue('export const MY_CODE_HERE = "VALUE";\n');
    }
}
