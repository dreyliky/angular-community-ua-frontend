import { FormControl } from '@angular/forms';

export declare type FormGroupDef<T> = {
    [K in keyof T]: FormControl<T[K]>;
};
