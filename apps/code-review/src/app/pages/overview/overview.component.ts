import { ScreenService } from '@acua/shared';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ProjectFile } from '@code-review/shared';
import { Observable, map } from 'rxjs';
import { CodeEditorComponent } from './components';
import { DependenciesFacade } from './facades';
import { MONACO_API_PROVIDER } from './providers';
import { MonacoThemeLoaderService } from './services';
import {
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
        MONACO_API_PROVIDER,
        DependenciesFacade,
        MonacoThemeLoaderService,
        ReviewRequestCommentsState,
        OpenedReviewRequestState,
        ProjectEntitiesState
    ]
})
export class OverviewComponent {
    public readonly dependencies$ = this.dependenciesFacade.loadAll();
    public readonly projectEntities$ = this.projectEntitiesState.data$;
    public readonly isMobile$ = this.screenService.isMatch$(['XSmall']);

    public readonly drawerMode$: Observable<MatDrawerMode> = this.isMobile$.pipe(
        map((isMobile) => (isMobile ? 'over' : 'side'))
    );

    public isSidenavOpened = !this.screenService.isMatch(['XSmall']);

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
        this.isSidenavOpened = !this.isSidenavOpened;
    }
}
