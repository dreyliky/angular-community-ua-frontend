import type { editor } from 'monaco-editor';

export const MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    fontSize: 16,
    domReadOnly: true,
    readOnly: true,
    contextmenu: false
};
