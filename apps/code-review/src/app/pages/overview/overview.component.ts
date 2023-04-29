import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ProjectFile } from '@code-review/shared';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CodeEditorComponent } from './components';
import { DependenciesService } from './services';
import { ProjectEntitiesState, ReviewRequestCommentsState } from './states';

@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReviewRequestCommentsState, ProjectEntitiesState, DependenciesService]
})
export class OverviewComponent {
    public readonly dependencies$ = this.dependenciesService.loadAll();
    public readonly projectEntities$ = this.projectEntitiesState.data$;
    public readonly isMobile = inject(DeviceDetectorService).isMobile();
    public readonly mode: MatDrawerMode = this.isMobile ? 'over' : 'side';
    public readonly adaptiveClasses = this.isMobile ? 'mat-drawer-mobile' : 'mat-drawer-desktop';

    public isSidenavOpened = !this.isMobile;

    @ViewChild(CodeEditorComponent)
    private readonly codeEditor!: CodeEditorComponent;

    constructor(
        private readonly dependenciesService: DependenciesService,
        private readonly projectEntitiesState: ProjectEntitiesState
    ) {}

    public onFileSelected(node: ProjectFile): void {
        this.codeEditor.openFile(node.fullPath, node.content);
    }

    public onHeaderHamburgerMenuButtonClick(): void {
        this.isSidenavOpened = !this.isSidenavOpened;
    }
}
