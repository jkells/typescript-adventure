import * as Editor from 'editor';

let slide = 10;

let showSlide = (slide: number) => {
    var css = "show-slide-" + slide;
    document.getElementById("slide-viewport").className = css;

    if (slide === 10) {
        document.getElementById("presentation-title").className = "";
        document.getElementById("contact").className = "";
    } else {
        document.getElementById("presentation-title").className = "fade-out";
        document.getElementById("contact").className = "fade-out";
    }
};

let bindKeyboard = () => {
    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 37)
            slide--;
        else if (e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32)
            slide++;

        if (slide < 1)
            slide = 10;
        if (slide > 10)
            slide = 1;

        showSlide(slide);
    }, false);
};

let example1 = () => {
    return Editor.createMonacoEditor(document.querySelector(".example-1"), `
// Let's see an example!

class Greeter{
    constructor(private name: string) {}

    public greet(){
        console.log("Hello " + this.name);
    }
}

let greeter1 = new Greeter("Jared");
greeter1.greet();

let greeter2 = new Greeter({foo: 1234});
greeter2.greet();
`);

}

let example2 = () => {
    Editor.createMonacoEditor(document.querySelector(".example-2"), `
var customers=[
    { 
        name: "Jared Kells",
        invoices: [
            {
                date: moment("20160924"),
                value: 300
            },
            {
                date: moment("20160925"),
                value: 100
            }
        ]
    },
    { 
        name: "Ada Kells",
        invoices: [
            {
                date: moment("20160924"),
                value: 600
            },
            {
                date: moment("20160927"),
                value: 50
            }
        ]
    }
]    
`);
}

export function run() {
    bindKeyboard();
    
    Editor.loadDeclaration()
        .then(() => example1())
        .then(() => example2());

    showSlide(slide);    
}