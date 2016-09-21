var createMonacoEditor = function (element: Element) {
    require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' } });
    require(['vs/editor/editor.main'], function () {
        element.addEventListener("keydown", e => e.stopPropagation());

        var lhs = monaco.editor.create(<HTMLElement>element.querySelector(".typescript-editor"), {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}',
                "x();"
            ].join('\n'),
            fontSize: 32,
            language: 'typescript'
        });

        var rhs = monaco.editor.create(<HTMLElement>element.querySelector(".javascript-editor"), {
            language: 'javascript'
        });

        /*
                var compile = function(){
                    var js = ts.transpileModule(lhs.getValue(), { compilerOptions: { module: ts.ModuleKind.CommonJS } });
                    rhs.setValue(js.outputText);
        
                    var oldConsole = window.console;
                    var output = "";
                    window.console = {
                        log: function(value){
                            output += value += "\n";
                        }
                    }
                    eval(js.outputText);
                    window.console = oldConsole;
                    outputElement.innerText = output;
                }
        
                lhs.addListener2("contentChanged", function () {
                    compile();
                });
        
                compile();
                */
    });
};