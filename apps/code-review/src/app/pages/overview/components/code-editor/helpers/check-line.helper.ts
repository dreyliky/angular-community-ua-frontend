import type { editor } from 'monaco-editor';

export function isTargetAfterLines(eventTarget: editor.IMouseTarget): boolean {
    const target = eventTarget as any;
    const targetDetails = target.detail;

    return targetDetails.isAfterLines;
}

export function whetherLineWithCode(
    model: editor.ITextModel,
    eventTarget: editor.IMouseTarget
): boolean {
    const lineNumber = eventTarget.position?.lineNumber as number;
    const lineLength = model.getLineLength(lineNumber);

    return !isTargetAfterLines(eventTarget) && lineLength > 0;
}

export function isLineSwitched(
    lastLineNumber: number,
    eventTarget: editor.IMouseTarget
): boolean {
    const lineNumber = eventTarget.position?.lineNumber as number;
    const lineMatch = lastLineNumber === lineNumber;

    return !lineMatch || isTargetAfterLines(eventTarget);
}
