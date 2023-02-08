import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'acua-header-menu',
    templateUrl: './acua-header-menu.component.html',
    styleUrls: ['./acua-header-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMenuComponent {
    @Output()
    public clickEmitter = new EventEmitter<Event>();

    public readonly codeReviewLink = '/code-review';

    public onClickEmit(event: Event): void {
        this.clickEmitter.emit(event);
    }
}
