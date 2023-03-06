import { ElementRef, inject, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverviewDataParam as DataParam } from '../../../enums';
import { MONACO_EDITOR } from '../../../tokens';
import { MonacoApi } from '../../../types';
import { MONACO_OPTIONS } from '../constants';

export const MONACO_EDITOR_PROVIDER: Provider = {
    provide: MONACO_EDITOR,
    useFactory: () => {
        const activatedRoute = inject(ActivatedRoute);
        const hostRef = inject(ElementRef);
        const routeData = activatedRoute.snapshot.data;
        const monacoApi: MonacoApi = routeData[DataParam.MonacoApi];

        return monacoApi.editor.create(hostRef.nativeElement, MONACO_OPTIONS);
    }
};
