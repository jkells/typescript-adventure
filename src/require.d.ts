declare var require : {
    (moduleNames: string[], onLoad: (...args: any[]) => void): void;
    config: (opts:
    {
        paths: any;
    })=> void;
};