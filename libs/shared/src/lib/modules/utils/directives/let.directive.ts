import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T> {
    acuaLet: T;
}

@Directive({
    selector: '[acuaLet]'
})
export class LetDirective<T> implements OnInit {
    @Input()
    public set acuaLet(value: T) {
        this._context = { acuaLet: value };
    }

    private _context!: LetContext<T>;

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<LetContext<T>>
    ) {}

    public static ngTemplateContextGuard<T>(
        directive: LetDirective<T>,
        context: unknown
    ): context is LetContext<T> {
        return true;
    }

    public ngOnInit(): void {
        this.viewContainerRef.createEmbeddedView(this.templateRef, this._context);
    }
}
