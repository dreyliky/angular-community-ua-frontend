import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    Output
} from '@angular/core';
import { AcuaWindow } from '@host/core/interfaces';
import { WINDOW } from '@host/core/tokens';
import { LoginWidgetConfig, TelegramLoginResponse } from '@host/interfaces';

@Directive({
    selector: '[acuaLoginWidget]'
})
export class LoginWidgetDirective implements AfterViewInit {
    @Input()
    public widgetConfig!: LoginWidgetConfig;

    @Output()
    public login: EventEmitter<TelegramLoginResponse> = new EventEmitter<TelegramLoginResponse>();

    constructor(
      @Inject(DOCUMENT) private readonly document: Document,
      @Inject(WINDOW)
      private readonly window: AcuaWindow,
      private scriptContainer: ElementRef,
      private ngZone: NgZone
    ) {
    }

    public ngAfterViewInit(): void {
        this.createScript();
    }

    private createScript(): void {
        const script = this.document.createElement('script');

        for (const [key, value] of Object.entries(this.widgetConfig)) {
            script.setAttribute(key, value);
        }

        // eslint-disable-next-line max-len
        this.window['onTelegramLogin'] = (data: TelegramLoginResponse) => this.ngZone.run(() => this.login.emit(data));
        this.scriptContainer.nativeElement.appendChild(script);
    }
}
