var createMonacoEditor = function (element: Element, code: string) {
    require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' } });
    require(['vs/editor/editor.main'], function () {
        element.addEventListener("keydown", e => e.stopPropagation());

        var lhs = monaco.editor.create(<HTMLElement>element.querySelector(".typescript-editor"), {            
            fontSize: 24,
            language: 'typescript'
        });

        lhs.setValue(code.trim());
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