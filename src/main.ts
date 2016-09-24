require.config({
    paths: {
        'es6-promise': '../node_modules/es6-promise/dist/es6-promise',
        'vs': '../node_modules/monaco-editor/dev/vs',
        'moment': '../node_modules/moment/moment',
        'lodash': '../node_modules/lodash/lodash'
    }
});


require(["presentation", "moment", "vs/editor/editor.main", "vs/language/typescript/lib/typescriptServices", "lodash", ], function(presentation, moment) {
    (<any>window).moment = moment;
    presentation.run();    
});