import type { editor } from 'monaco-editor';
import { LINE_DECORATION_CLASS_NAME } from '../constants';

export function isTargetOverActualLineOfCode(mouseTarget: editor.IMouseTarget): boolean {
    const isTargetLineDecoratorElement = mouseTarget.element?.classList.contains(
        LINE_DECORATION_CLASS_NAME
    );

    return !!isTargetLineDecoratorElement;
}
