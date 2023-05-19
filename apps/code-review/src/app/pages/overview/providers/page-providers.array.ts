import { Provider, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverviewParamEnum } from '../enums';
import { DependenciesFacade } from '../facades';
import {
    MonacoThemeLoaderService,
    ProjectEntitiesInitializationService,
    ReviewRequestCommentAmountService
} from '../services';
import {
    InitialFoldersOpenedState,
    MonacoApiState,
    OpenedReviewRequestState,
    ProjectEntitiesState,
    ProjectFileSelectionState,
    ReviewRequestCommentAmountState
} from '../states';
import { OPENED_REVIEW_REQUEST_ID } from '../tokens';

export const PAGE_PROVIDERS: Provider[] = [
    DependenciesFacade,
    MonacoApiState,
    ProjectEntitiesInitializationService,
    MonacoThemeLoaderService,
    ReviewRequestCommentAmountService,
    ReviewRequestCommentAmountState,
    OpenedReviewRequestState,
    ProjectFileSelectionState,
    ProjectEntitiesState,
    InitialFoldersOpenedState,
    {
        provide: OPENED_REVIEW_REQUEST_ID,
        useFactory: () => {
            const activatedRoute = inject(ActivatedRoute);

            return activatedRoute.snapshot.params[OverviewParamEnum.Id];
        }
    }
];