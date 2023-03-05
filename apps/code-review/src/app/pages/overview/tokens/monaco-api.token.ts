import { InjectionToken } from '@angular/core';
import { MonacoApi } from '../types';

export const MONACO_API = new InjectionToken<MonacoApi>('MONACO_API');
