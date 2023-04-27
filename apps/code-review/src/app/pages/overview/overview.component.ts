import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ProjectFile } from '@code-review/shared';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CodeEditorComponent } from './components';
import { SOURCE_CODE_PROVIDER } from './providers';
import { SOURCE_CODE } from './tokens';
import { DependenciesService } from './services';

@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SOURCE_CODE_PROVIDER, DependenciesService]
})
export class OverviewComponent {
    public tree = inject(SOURCE_CODE);
    public dependencies$ = this.dependenciesService.loadSourceCode();
    public readonly isMobile = this.deviceService.isMobile();
    public readonly mode: MatDrawerMode = this.isMobile ? 'over' : 'side';
    public readonly adaptiveClasses = this.isMobile ? 'mat-drawer-mobile' : 'mat-drawer-desktop';

    public isSidenavOpened = this.isMobile ? false : true;

    @ViewChild(CodeEditorComponent)
    private readonly codeEditor!: CodeEditorComponent;

    constructor(
        private readonly deviceService: DeviceDetectorService,
        private readonly dependenciesService: DependenciesService
    ) {}

    public onFileSelected(node: ProjectFile): void {
        this.codeEditor.openFile(node.fullPath, node.content);
    }

    public onHeaderHamburgerMenuButtonClick(): void {
        this.isSidenavOpened = !this.isSidenavOpened;
    }
}
