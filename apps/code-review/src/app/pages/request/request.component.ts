import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum } from '@code-review/core';
import { RequestFormComponent } from './components';

@Component({
    selector: 'acua-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestComponent {
    @ViewChild('form') protected requestForm!: RequestFormComponent;

    constructor(private router: Router, private route: ActivatedRoute) {}

    protected get disabled(): boolean {
        return !this.requestForm?.valid;
    }

    protected onRequestCreationButtonClick(): void {
        console.log(this.requestForm.value);
        console.log(this.route.snapshot.url);

        this.router.navigate(['../', AppRouteEnum.Overview], {
            relativeTo: this.route
        });
    }
}
