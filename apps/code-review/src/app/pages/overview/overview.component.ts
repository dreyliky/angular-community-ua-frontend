import {
    ChangeDetectionStrategy,
    Component,
    inject,
    ViewChild
} from '@angular/core';
import { MonacoTreeFileNode } from '@code-review/shared';
import { CodeEditorComponent } from './components';
import { MatDrawerMode } from '@angular/material/sidenav';
import { SOURCE_CODE_PROVIDER } from './providers';
import { SOURCE_CODE } from './tokens';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SOURCE_CODE_PROVIDER]
})
export class OverviewComponent {
    public tree = inject(SOURCE_CODE);
    public readonly isMobile = this.deviceService.isMobile();
    public mode: MatDrawerMode = this.isMobile ? 'over' : 'side';
    public isSidenavOpened = this.isMobile ? false : true;

    @ViewChild(CodeEditorComponent)
    private readonly codeEditor!: CodeEditorComponent;

    constructor(private readonly deviceService: DeviceDetectorService) {}

    public onFileSelected(node: MonacoTreeFileNode): void {
        this.codeEditor.openFile(node.fullPath, node.content);
    }

    public onHeaderHamburgerMenuButtonClick(): void {
        this.isSidenavOpened = !this.isSidenavOpened;
    }
}
