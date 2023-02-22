import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
    name: 'safeResourceUrl'
})
export class SafeResourceUrlPipe implements PipeTransform {
    constructor(private readonly sanitizer: DomSanitizer) {}

    public transform(link: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(link);
    }
}
