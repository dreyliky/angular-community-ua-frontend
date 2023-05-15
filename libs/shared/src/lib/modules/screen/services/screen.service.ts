import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScreenService {
    constructor(private readonly breakpointObserver: BreakpointObserver) {}

    public isMatch$(
        screenTypes: Array<keyof typeof Breakpoints>
    ): Observable<boolean> {
        return this.breakpointObserver
            .observe(this.getBreakpoints(screenTypes))
            .pipe(map(({ matches }) => matches));
    }

    public isMatch(
        screenTypes: Array<keyof typeof Breakpoints>
    ): Signal<boolean> {
        return toSignal(this.isMatch$(screenTypes), { initialValue: false });
    }

    private getBreakpoints(
        screenTypes: Array<keyof typeof Breakpoints>
    ): string[] {
        return screenTypes.map((type) => Breakpoints[type]);
    }
}
