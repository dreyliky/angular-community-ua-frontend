import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    inject,
    signal
} from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription, defer, take } from 'rxjs';
import {
    ReviewRequestCommentAmountService as CommentAmountService,
    InitialFoldersOpenedService
} from '../../../../services';
import { FOLDERS_ICON_NAME_MAPPER } from '../../data';
import { BaseNodeComponent } from '../base-node.component';

type FolderName = keyof typeof FOLDERS_ICON_NAME_MAPPER;

@Component({
    selector: 'acua-folder-node',
    templateUrl: './folder-node.component.html',
    styleUrls: ['./folder-node.component.scss', '../base-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderNodeComponent extends BaseNodeComponent implements OnInit {
    public readonly isOpened = signal(false);
    public readonly isContainAnyFileWithComments$ = defer(() =>
        this.commentAmountService.isFolderContainAnyCommendedFile(
            this.data.fullPath
        )
    );

    private readonly commentAmountService = inject(CommentAmountService);
    private readonly openDirectoryService = inject(InitialFoldersOpenedService);

    public ngOnInit(): void {
        this.initFolderOpenedState();
    }

    public onRowClick(): void {
        this.isOpened.update((value) => !value);
        this.openDirectoryService.setState(this.data.fullPath, this.isOpened());
    }

    protected getIcon(): string {
        const nameAsFolderName = this.data.name as FolderName;
        let folderName = 'folder';

        if (FOLDERS_ICON_NAME_MAPPER[nameAsFolderName]) {
            folderName = FOLDERS_ICON_NAME_MAPPER[nameAsFolderName];
        }

        if (this.isOpened()) {
            return `${folderName}-open`;
        }

        return folderName;
    }

    @AutoUnsubscribe()
    private initFolderOpenedState(): Subscription {
        return this.openDirectoryService
            .getState(this.data.fullPath)
            .pipe(take(1))
            .subscribe((state) => {
                this.isOpened.update(() => state);
            });
    }
}
