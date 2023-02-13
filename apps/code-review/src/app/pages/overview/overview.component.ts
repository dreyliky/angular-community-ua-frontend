import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CodeEditorComponent } from './components';

@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class OverviewComponent implements AfterViewInit {
    @ViewChild(CodeEditorComponent)
    private readonly codeEditor!: CodeEditorComponent;

    public ngAfterViewInit(): void {
        // FIXME: Replace to real approach
        this.codeEditor.setValue('export const MY_CODE_HERE = "VALUE";\n');
    }
}
