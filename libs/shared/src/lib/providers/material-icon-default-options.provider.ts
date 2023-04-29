import { Provider } from '@angular/core';
import { MAT_ICON_DEFAULT_OPTIONS, MatIconDefaultOptions } from '@angular/material/icon';

export const MATERIAL_ICON_DEFAULT_OPTIONS_PROVIDER: Provider = {
    provide: MAT_ICON_DEFAULT_OPTIONS,
    useValue: <MatIconDefaultOptions>{
        fontSet: 'material-icons-outlined'
    }
};
