import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class UrlsWithAuthState extends ArrayState<string> {
    constructor() {
        super([]);
    }

    public register(urls: string[]): void {
        const newUrls = this.data!;

        urls.forEach((url) => {
            if (!newUrls.includes(url)) {
                newUrls.push(url);
            }
        });

        this.set(newUrls);
    }
}
