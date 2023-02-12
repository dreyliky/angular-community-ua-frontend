import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Inject, NgZone,
    Output
} from '@angular/core';
import { AcuaWindow } from '@host/core/interfaces';
import { ENVIRONMENT, WINDOW } from '@host/core/tokens';
import { TelegramLoginResponse } from '@host/interfaces';
import { environment } from 'apps/host/src/environments/environment';

@Directive({
    selector: '[acuaLoginWidget]'
})
export class LoginWidgetDirective implements AfterViewInit {
    @Output()
    public login: EventEmitter<TelegramLoginResponse> = new EventEmitter<TelegramLoginResponse>();

    constructor(
      @Inject(DOCUMENT) private readonly document: Document,
      @Inject(WINDOW)
      private readonly window: AcuaWindow,
      @Inject(ENVIRONMENT)
      private readonly env: typeof environment,
      private readonly hostRef: ElementRef<HTMLElement>,
      private readonly ngZone: NgZone
    ) {
    }

    public ngAfterViewInit(): void {
        this.createScript();
    }

    private createScript(): void {
        const script = this.document.createElement('script');

        script.setAttribute('src', 'https://telegram.org/js/telegram-widget.js?21');
        script.setAttribute('data-telegram-login', this.env['BotLoginName']);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-request-access', 'write');
        script.setAttribute('data-onauth', 'onTelegramLogin(user)');

        this.window['onTelegramLogin'] =
            (data: any) => this.ngZone.run(() => this.login.emit(data));
        this.hostRef.nativeElement.appendChild(script);
    }
}
