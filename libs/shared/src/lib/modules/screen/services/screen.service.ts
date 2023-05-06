import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
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

    public isMatch(screenTypes: Array<keyof typeof Breakpoints>): boolean {
        return this.breakpointObserver.isMatched(screenTypes);
    }

    private getBreakpoints(
        screenTypes: Array<keyof typeof Breakpoints>
    ): string[] {
        return screenTypes.map((type) => Breakpoints[type]);
    }
}
