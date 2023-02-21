import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RequestFormComponent } from './components';

@Component({
    selector: 'acua-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestComponent {
    @ViewChild('form') protected requestForm!: RequestFormComponent;

    constructor(private router: Router) {}

    protected get disabled(): boolean {
        return !this.requestForm?.valid;
    }

    protected click(): void {
        this.requestForm.submit();
    }

    protected onSubmitForm(formData: any): void {
        console.log(formData);
        this.router.navigateByUrl('/overview');
    }
}
