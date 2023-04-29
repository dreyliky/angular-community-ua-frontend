import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    inject,
    NgZone,
    Output
} from '@angular/core';
import { ENVIRONMENT, WINDOW } from '@host/core';
import { TelegramLoginResponse } from '@host/shared';

@Directive({
    selector: '[acuaLoginWidget]'
})
export class LoginWidgetDirective implements AfterViewInit {
    @Output()
    public login = new EventEmitter<TelegramLoginResponse>();

    private readonly document = inject(DOCUMENT);
    private readonly window = inject(WINDOW);
    private readonly environment = inject(ENVIRONMENT);

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly ngZone: NgZone
    ) {}

    public ngAfterViewInit(): void {
        const scriptElement = this.document.createElement('script');

        this.setupScript(scriptElement);
        this.hostRef.nativeElement.appendChild(scriptElement);
    }

    private setupScript(script: HTMLScriptElement): void {
        script.setAttribute('src', 'https://telegram.org/js/telegram-widget.js?21');
        script.setAttribute('data-telegram-login', this.environment.botLoginName);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-lang', 'uk');
        script.setAttribute('data-request-access', 'write');
        script.setAttribute('data-onauth', 'onTelegramLogin(user)');

        this.window.onTelegramLogin = (data) => this.ngZone.run(() => this.login.emit(data));
    }
}
