import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, inject, ViewChild
} from '@angular/core';
import { MonacoTreeFileNode } from '@code-review/shared';
import { CodeEditorComponent } from './components';
import { SOURCE_CODE_PROVIDER } from './providers';
import { SOURCE_CODE } from './tokens';

@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SOURCE_CODE_PROVIDER]
})
export class OverviewComponent implements AfterViewInit {
    public tree = inject(SOURCE_CODE);

    @ViewChild(CodeEditorComponent)
    private readonly codeEditor!: CodeEditorComponent;

    public ngAfterViewInit(): void {
        // FIXME: Replace to real approach
        this.codeEditor.openFile(
            'apps/main/src/main.ts',
            'export const MY_CODE_HERE = "VALUE";\nexport const s = "VAE";\n' +
                'export const myAmazingConst = "Hello world!"\n'
        );
    }

    public onFileSelected(node: MonacoTreeFileNode): void {
        console.log(node);
        // this.codeEditor.openFile(node.fullPath, node.content);
    }
}
