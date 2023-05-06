import { Directive, Input, computed, inject } from '@angular/core';
import { ProjectEntity } from '@code-review/shared';
import { FileSelectionState } from '../states';

@Directive()
export abstract class BaseNodeComponent {
    @Input({ required: true })
    public data!: ProjectEntity;

    @Input()
    public depth = 0;

    public get marginLeftStyleValue(): string {
        return `${this.baseMarginLeft * this.depth}px`;
    }

    public readonly incrementedDepth = computed(() => this.depth + 1);

    public readonly iconUrl = computed(
        () => `/assets/icons/file-explorer/${this.icon()}.svg`
    );

    protected readonly fileSelectionState = inject(FileSelectionState);

    protected readonly icon = computed(() => this.getIcon());

    private readonly baseMarginLeft = 10;

    protected abstract getIcon(): string;
}
