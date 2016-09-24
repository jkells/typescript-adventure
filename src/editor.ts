import {Promise} from 'es6-promise';

export function loadDeclaration() {
    let loadDeclaration = (path) => {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', path, true);
            request.onload = () => {
                monaco.languages.typescript.typescriptDefaults.addExtraLib(request.responseText);
                monaco.languages.typescript.javascriptDefaults.addExtraLib(request.responseText);
                resolve();
            }
            request.send();
        });
    };

    return Promise.all([
        loadDeclaration('../typings/globals/lodash/index.d.ts'),
        loadDeclaration('../typings/globals/moment/index.d.ts')
    ]);
};

export function createMonacoEditor(element: Element, code: string) {
    let tsElement = <HTMLElement>element.querySelector(".typescript-editor .monaco");
    let jsElement = <HTMLElement>element.querySelector(".javascript-editor .monaco");
    let outputElement = <HTMLElement>element.querySelector(".output");

    element.addEventListener("keydown", e => e.stopPropagation());

    let lhs = monaco.editor.create(tsElement, {
        fontSize: 24,
        language: 'typescript',
    });

    lhs.setValue(code.trim());
    let rhs = monaco.editor.create(jsElement, {
        language: 'javascript'
    });

    let compile = function () {
        try {
            var js = ts.transpileModule(lhs.getValue(), { compilerOptions: { module: ts.ModuleKind.CommonJS, } });
        } catch (e) { }

        rhs.setValue(js.outputText);

        var oldConsole = window.console;
        var output = "";
        (<any>(window)).console = {
            log: (value) => {
                output += JSON.stringify(value) + "\n";
            },
            warn: (value) => {
                output += "Warning: " + value + "\n";
            }
        };

        eval(js.outputText);
        window.console = oldConsole;
        outputElement.innerText = output;
    }

    let timeout = null;
    lhs.addListener2("contentChanged", function () {
        if (timeout != null)
            clearTimeout(timeout);
        timeout = setTimeout(() => compile(), 200);
    });

    compile();
};