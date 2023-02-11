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
import { LoginWidgetEnum } from '../enums/login-widget.enum';
import { LoginWidgetConfig } from '../interfaces/login-widget.interface';
import { User } from '../interfaces/user.interface';

@Directive({
    selector: '[acuaLoginWidget]'
})
export class LoginWidgetDirective implements AfterViewInit {
    @Input()
    public widgetConfig!: LoginWidgetConfig;

    @Output()
    public loginChange: EventEmitter<User> = new EventEmitter<User>();

    private readonly document: Document;
    private readonly window: any;

    constructor(
      @Inject(DOCUMENT) document: any,
      private scriptContainer: ElementRef,
      private ngZone: NgZone
    ) {
        this.document = document;
        this.window = window;
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
        this.window[LoginWidgetEnum.BotCallbackName] = (data: User) => this.ngZone.run(() => this.loginChange.emit(data));
        this.scriptContainer.nativeElement.innerHTML = '';
        this.scriptContainer.nativeElement.appendChild(script);
        console.log(this.scriptContainer.nativeElement);
    }
}
