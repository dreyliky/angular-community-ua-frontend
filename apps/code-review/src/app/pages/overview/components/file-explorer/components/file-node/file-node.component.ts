import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    inject,
    signal
} from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription, defer, filter } from 'rxjs';
import { ReviewRequestCommentAmountService as CommentAmountService } from '../../../../services';
import { EXTENSION_ICON_NAME_MAPPER, FILE_ICON_NAME_MAPPER } from '../../data';
import { BaseNodeComponent } from '../base-node.component';

type FileName = keyof typeof FILE_ICON_NAME_MAPPER;
type ExtensionName = keyof typeof EXTENSION_ICON_NAME_MAPPER;

@Component({
    selector: 'acua-file-node',
    templateUrl: './file-node.component.html',
    styleUrls: ['file-node.component.scss', '../base-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileNodeComponent extends BaseNodeComponent implements OnInit {
    public readonly isSelected = signal(false);
    public readonly commentAmount$ = defer(() =>
        this.commentAmountService.getForFile(this.data.fullPath)
    );

    private readonly commentAmountService = inject(CommentAmountService);

    public ngOnInit(): void {
        this.initFileSelectionObserver();
    }

    public onRowClick(): void {
        this.fileSelectionState.set(this.data);
    }

    protected getIcon(): string {
        if (FILE_ICON_NAME_MAPPER[this.data.name as FileName]) {
            return FILE_ICON_NAME_MAPPER[this.data.name as FileName];
        }

        const extensionIconName = this.tryGetExtensionIconName();

        if (extensionIconName) {
            return extensionIconName;
        }

        return 'file';
    }

    @AutoUnsubscribe()
    private initFileSelectionObserver(): Subscription {
        return this.fileSelectionState.data$
            .pipe(filter(Boolean))
            .subscribe((node) => {
                this.isSelected.set(node.fullPath === this.data.fullPath);
            });
    }

    private tryGetExtensionIconName(): string | null {
        let nameArray = this.data.name.split('.');

        while (nameArray.length > 0) {
            const possibleExtensionName = nameArray.join('.') as ExtensionName;

            if (EXTENSION_ICON_NAME_MAPPER[possibleExtensionName]) {
                return EXTENSION_ICON_NAME_MAPPER[possibleExtensionName];
            }

            nameArray = nameArray.slice(1);
        }

        return null;
    }
}
