declare var require : any;

// Missing declaration
declare module monaco.editor {
    interface IStandaloneCodeEditor {
        addListener2: (event: string, callback: () => void) => void;
    }
}