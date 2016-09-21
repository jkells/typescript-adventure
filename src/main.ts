
let slide = 10;

let showSlide = (slide: number) =>{
    var css = "show-slide-" + slide;
    document.getElementById("slide-viewport").className = css;

    if(slide === 10){
        document.getElementById("presentation-title").className = "";
    }else{
        document.getElementById("presentation-title").className = "fade-out";
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

bindKeyboard();
showSlide(slide);


createMonacoEditor(document.querySelector(".example-1"), `
// Let's see some examples!

// Type inference
var user = {
    name: "Jared Kells",
    age: 32
};

user.name.trim();
user.age.trim();


`);