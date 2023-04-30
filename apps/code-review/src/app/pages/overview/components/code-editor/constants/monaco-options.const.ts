import type { editor } from 'monaco-editor';

export const MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    theme: 'tommorow-night',
    language: 'typescript',
    fontSize: 18,
    domReadOnly: true,
    readOnly: true,
    contextmenu: false,
    minimap: {
        enabled: false
    },
    selectOnLineNumbers: false,
    snippetSuggestions: 'none',
    renderLineHighlight: 'none',
    automaticLayout: true,
    bracketPairColorization: {
        enabled: true
    },
    disableLayerHinting: true,
    inlayHints: {
        enabled: 'on'
    },
    hover: {
        enabled: false
    }
};
