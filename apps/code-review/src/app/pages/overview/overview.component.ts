import { ScreenService } from '@acua/shared';
import {
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    computed,
    signal
} from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription, filter } from 'rxjs';
import { CodeEditorComponent } from './components';
import { DependenciesFacade } from './facades';
import { OPENED_REVIEW_REQUEST_ID_PROVIDER } from './providers';
import {
    MonacoThemeLoaderService,
    ReviewRequestCommentAmountService
} from './services';
import {
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
        MonacoApiState,
        MonacoThemeLoaderService,
        ReviewRequestCommentAmountService,
        ReviewRequestCommentAmountState,
        OpenedReviewRequestState,
        ProjectFileSelectionState,
        ProjectEntitiesState
    ]
})
export class OverviewComponent {
    public readonly dependencies$ = this.dependenciesFacade.loadAll();
    public readonly isMobile = this.screenService.isMatch(['XSmall']);
    public readonly isSidenavOpened = signal(!this.isMobile());

    public readonly drawerMode = computed<MatDrawerMode>(() =>
        this.isMobile() ? 'over' : 'side'
    );

    @ViewChild(CodeEditorComponent)
    private readonly codeEditor!: CodeEditorComponent;

    constructor(
        private readonly screenService: ScreenService,
        private readonly fileSelectionState: ProjectFileSelectionState,
        private readonly dependenciesFacade: DependenciesFacade
    ) {
        this.initFileSelectionObserver();
    }

    public onHeaderHamburgerMenuButtonClick(): void {
        this.isSidenavOpened.update((state) => !state);
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
