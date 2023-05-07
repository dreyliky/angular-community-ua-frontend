import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    signal
} from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription, filter } from 'rxjs';
import { EXTENSION_ICON_NAME_MAPPER, FILE_ICON_NAME_MAPPER } from '../../data';
import { BaseNodeComponent } from '../base-node.component';

type FileName = keyof typeof FILE_ICON_NAME_MAPPER;
type ExtensionName = keyof typeof EXTENSION_ICON_NAME_MAPPER;

@Component({
    selector: 'acua-file-node',
    templateUrl: './file-node.component.html',
    styleUrls: ['../base-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileNodeComponent extends BaseNodeComponent implements OnInit {
    public readonly isSelected = signal(false);

    public ngOnInit(): void {
        this.initFileSelection();
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
    private initFileSelection(): Subscription {
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
