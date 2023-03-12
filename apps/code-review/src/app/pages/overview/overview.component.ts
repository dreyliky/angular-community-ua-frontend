import {
    ChangeDetectionStrategy,
    Component,
    inject,
    ViewChild
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
export class OverviewComponent {
    public tree = inject(SOURCE_CODE);

    @ViewChild(CodeEditorComponent)
    private readonly codeEditor!: CodeEditorComponent;

    public onFileSelected(node: MonacoTreeFileNode): void {
        this.codeEditor.openFile(node.fullPath, node.content);
    }
}
