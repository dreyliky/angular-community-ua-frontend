import type { editor } from 'monaco-editor';

export function whetherLineWithCode(
    model: editor.ITextModel,
    eventTarget: editor.IMouseTarget
): boolean {
    const target = eventTarget as any;
    const targetDetails = target.detail;
    const lineNumber = eventTarget.position?.lineNumber as number;
    const lineLength = model.getLineLength(lineNumber);

    return !targetDetails.isAfterLines && lineLength > 0;
}
