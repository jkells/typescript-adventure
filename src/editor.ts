
// Missing declaration
declare module monaco.editor {
    interface IStandaloneCodeEditor {
        addListener2: (event: string, callback: () => void) => void;
    }
}

var createMonacoEditor = function (element: Element, code: string) {
    require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' } });
    require(['vs/editor/editor.main'], function () {

        let tsElement = <HTMLElement>element.querySelector(".typescript-editor .monaco");
        let jsElement = <HTMLElement>element.querySelector(".javascript-editor .monaco");
        let outputElement = <HTMLElement>element.querySelector(".output");

        element.addEventListener("keydown", e => e.stopPropagation());

        let lhs = monaco.editor.create(tsElement, {
            fontSize: 24,
            language: 'typescript'
        });

        lhs.setValue(code.trim());
        let rhs = monaco.editor.create(jsElement, {
            language: 'javascript'
        });

        let compile = function () {
            var js = ts.transpileModule(lhs.getValue(), { compilerOptions: { module: ts.ModuleKind.CommonJS } });
            rhs.setValue(js.outputText);

            var oldConsole = window.console;
            var output = "";
            (<any>(window)).console = {
                log: (value) => {
                    output += JSON.stringify(value) + "\n";
                },
                warn: (value) =>{
                    output += "Warning: " + value + "\n";
                }
            };

            eval(js.outputText);
            window.console = oldConsole;
            outputElement.innerText = output;
        }

        let timeout = null;
        lhs.addListener2("contentChanged", function () {
            if(timeout != null)
                clearTimeout(timeout);
            timeout = setTimeout(()=>compile(), 200);            
        });

        compile();
    });
};