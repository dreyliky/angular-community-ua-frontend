import {
    AfterViewInit,
    ChangeDetectionStrategy, Component,
    ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeEditorComponent } from './components';
import { OverviewDataParam } from './enums';

@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements AfterViewInit {
    public tree = this.route.snapshot.data[OverviewDataParam.TreeNode];

    @ViewChild(CodeEditorComponent)
    private readonly codeEditor!: CodeEditorComponent;

    constructor(
        private readonly route: ActivatedRoute
    ) {}

    public ngAfterViewInit(): void {
        // FIXME: Replace to real approach
        this.codeEditor.openFile(
            'apps/main/src/main.ts',
            'export const MY_CODE_HERE = "VALUE";\nexport const s = "VAE";\n' +
                'export const myAmazingConst = "Hello world!"\n'
        );
    }
}
