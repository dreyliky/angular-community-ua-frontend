import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    inject,
    signal
} from '@angular/core';
import { Subscription, defer } from 'rxjs';
import {
    ReviewRequestCommentAmountService as CommentAmountService,
    OpenDirectoryService
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
    private readonly openDirectoryService = inject(OpenDirectoryService);

    public ngOnInit(): void {
        this.initOpenDirectoryState();
    }

    public onRowClick(): void {
        this.isOpened.update((value) => !value);
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

    private initOpenDirectoryState(): Subscription {
        return this.openDirectoryService
            .getOpenDirectoryState(this.data.fullPath)
            .subscribe((state) => {
                this.isOpened.update(() => state);
                this.openDirectoryService.setOpenDirectoryState(
                    this.data.fullPath,
                    false
                );
            });
    }
}
