import { ScreenService } from '@acua/shared';
import {
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    computed,
    signal
} from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription, filter } from 'rxjs';
import { CodeEditorComponent } from './components';
import { OverviewQueryParamEnum } from './enums';
import { DependenciesFacade, InitialFoldersFacade } from './facades';
import { OPENED_REVIEW_REQUEST_ID_PROVIDER } from './providers';
import {
    InitialFoldersOpenedService,
    MonacoThemeLoaderService,
    ReviewRequestCommentAmountService
} from './services';
import {
    InitialFoldersOpenedState,
    MonacoApiState,
    OpenedReviewRequestState,
    ProjectEntitiesState,
    ProjectFileSelectionState,
    ReviewRequestCommentAmountState
} from './states';

@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        OPENED_REVIEW_REQUEST_ID_PROVIDER,
        DependenciesFacade,
        InitialFoldersFacade,
        MonacoApiState,
        MonacoThemeLoaderService,
        ReviewRequestCommentAmountService,
        InitialFoldersOpenedService,
        ReviewRequestCommentAmountState,
        OpenedReviewRequestState,
        ProjectFileSelectionState,
        ProjectEntitiesState,
        InitialFoldersOpenedState
    ]
})
export class OverviewComponent {
    public readonly dependencies$ = this.dependenciesFacade.loadAll();
    public readonly isMobile = this.screenService.isMatch(['XSmall']);
    public readonly isSidenavOpened = signal(!this.isMobile());

    public readonly drawerMode = computed<MatDrawerMode>(() =>
        this.isMobile() ? 'over' : 'side'
    );

    private _codeEditor!: CodeEditorComponent;

    @ViewChild(CodeEditorComponent)
    private set codeEditor(value: CodeEditorComponent) {
        if (value) {
            this._codeEditor = value;
            this.setFileFromQuery();
        }
    }

    private get codeEditor(): CodeEditorComponent {
        return this._codeEditor;
    }

    constructor(
        private readonly screenService: ScreenService,
        private readonly fileSelectionState: ProjectFileSelectionState,
        private readonly projectEntitiesState: ProjectEntitiesState,
        private readonly dependenciesFacade: DependenciesFacade,
        private readonly initialFoldersFacade: InitialFoldersFacade,
        private readonly route: ActivatedRoute
    ) {
        this.initFileSelectionObserver();
    }

    public onHeaderHamburgerMenuButtonClick(): void {
        this.isSidenavOpened.update((state) => !state);
    }

    public setFileFromQuery(): void {
        const queryFile =
            this.route.snapshot.queryParams[OverviewQueryParamEnum.File];
        const projectEntities = this.projectEntitiesState.data;

        if (queryFile && projectEntities) {
            this.initialFoldersFacade.setFileFromQuery(
                queryFile,
                projectEntities
            );
        }
    }

    @AutoUnsubscribe()
    private initFileSelectionObserver(): Subscription {
        return this.fileSelectionState.data$
            .pipe(filter(Boolean))
            .subscribe((file) => {
                this.codeEditor.openFile(file.fullPath, file.content);
            });
    }
}
