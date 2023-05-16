import { ScreenService } from '@acua/shared';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewChild,
    computed,
    signal
} from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ProjectEntity, ProjectEntityTypeEnum } from '@code-review/shared';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription, filter } from 'rxjs';
import { CodeEditorComponent } from './components';
import { DependenciesFacade } from './facades';
import { OPENED_REVIEW_REQUEST_ID_PROVIDER } from './providers';
import {
    MonacoThemeLoaderService,
    OpenDirectoryService,
    ReviewRequestCommentAmountService
} from './services';
import {
    MonacoApiState,
    OpenDirectoryState,
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
        OpenDirectoryService,
        ReviewRequestCommentAmountState,
        OpenedReviewRequestState,
        ProjectFileSelectionState,
        ProjectEntitiesState,
        OpenDirectoryState
    ]
})
export class OverviewComponent {
    @Input() public file!: string;

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
        private readonly projectEntitiesState: ProjectEntitiesState,
        private readonly dependenciesFacade: DependenciesFacade,
        private readonly openDirectoryService: OpenDirectoryService
    ) {
        this.initFileSelectionObserver();
    }

    public onHeaderHamburgerMenuButtonClick(): void {
        this.isSidenavOpened.update((state) => !state);
    }

    public setFileFromQuery(): void {
        setTimeout(() => {
            if (this.file) {
                const filePath = this.file.split('/');
                const files = this.findFilesByPathArray(filePath);

                for (let i = 0; i < files.length; i++) {
                    if (files[i].type === ProjectEntityTypeEnum.Folder) {
                        this.openDirectoryService.setOpenDirectoryState(
                            files[i].fullPath,
                            true
                        );
                    } else {
                        this.fileSelectionState.set(files[i]);
                    }
                }
            }
        }, 0);
    }

    private findFilesByPathArray(pathArray: string[]): ProjectEntity[] {
        const returnFiles: ProjectEntity[] = [];
        let data = this.projectEntitiesState.data;

        while (pathArray.length > 0) {
            const path = pathArray.shift();
            const findFile = data?.find((file) => file.name === path);

            if (findFile) {
                data = findFile.children ? findFile.children : [];
                returnFiles.push(findFile);
            }
        }

        return returnFiles;
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
