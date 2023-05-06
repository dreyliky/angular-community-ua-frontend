import { ScreenService } from '@acua/shared';
import {
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    computed,
    signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ProjectFile } from '@code-review/shared';
import { CodeEditorComponent } from './components';
import { DependenciesFacade } from './facades';
import { MonacoThemeLoaderService } from './services';
import {
    MonacoApiState,
    OpenedReviewRequestState,
    ProjectEntitiesState,
    ReviewRequestCommentsState
} from './states';

@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DependenciesFacade,
        MonacoApiState,
        MonacoThemeLoaderService,
        ReviewRequestCommentsState,
        OpenedReviewRequestState,
        ProjectEntitiesState
    ]
})
export class OverviewComponent {
    public readonly dependencies$ = this.dependenciesFacade.loadAll();
    public readonly projectEntities = toSignal(this.projectEntitiesState.data$);
    public readonly isMobile = this.screenService.isMatch(['XSmall']);

    public readonly drawerMode = computed<MatDrawerMode>(() =>
        this.isMobile() ? 'over' : 'side'
    );

    public isSidenavOpened = signal(!this.isMobile());

    @ViewChild(CodeEditorComponent)
    private readonly codeEditor!: CodeEditorComponent;

    constructor(
        private readonly screenService: ScreenService,
        private readonly dependenciesFacade: DependenciesFacade,
        private readonly projectEntitiesState: ProjectEntitiesState
    ) {}

    public onFileSelected(node: ProjectFile): void {
        this.codeEditor.openFile(node.fullPath, node.content);
    }

    public onHeaderHamburgerMenuButtonClick(): void {
        this.isSidenavOpened.set(!this.isSidenavOpened);
    }
}
