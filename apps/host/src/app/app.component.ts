import { StorageService } from '@acua/shared';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    constructor(
        private readonly storageService: StorageService
    ) {
        console.log(this.storageService);
    }
}
