var arr;
var arr2;
var level;
restart();
function restart() {
    level = 1
    remove();
    arr = [];
    arr2 = [];
    for (var i = 0; i < document.querySelectorAll(".block").length; i++) {
        document.querySelectorAll(".block")[i].addEventListener("click", start);
    }
}
function start() {
    document.getElementsByTagName("h2")[0].innerHTML = "Level " + level;
    remove();
    let audio;
    let number = Math.floor(4 * Math.random());
    let classes = document.querySelectorAll(".block")[number].classList;
    sound(classes[0]); //gives the color
    animation(classes);
    arr.push(number);
    arr2 = arr;
    click(arr);
    level++;
}
function click(a) {
    remove();
    for (var j = 0; j < document.querySelectorAll(".block").length; j++) {
        if (j === a[0]) {
            document.querySelectorAll(".block")[j].addEventListener("click", only);
        } else {
            document.querySelectorAll(".block")[j].addEventListener("click", other);
        }
    }
}
function sound(color) {
    if (color === "red") {
        audio = new Audio("sounds/red.mp3");
    } else if (color === "green") {
        audio = new Audio("sounds/green.mp3");
    } else if (color === "blue") {
        audio = new Audio("sounds/blue.mp3");
    } else if (color === "yellow") {
        audio = new Audio("sounds/yellow.mp3");
    } else {
        audio = new Audio("sounds/wrong.mp3");
    }
    audio.play();
}
function animation(x) {
    x.add("anim");
    setTimeout(() => {
        x.remove("anim");
    }, 1000);
}
function other(evt) {
    sound("wrong"); // doesn't matter what the input is.
    animation(evt.srcElement.classList);
    document.getElementsByTagName("h2")[0].innerHTML = "Game Over";
    setTimeout(() => {
        restart();
    }, 1000);
}
function only(evt) {
    sound(evt.srcElement.classList[0]);
    animation(evt.srcElement.classList);
    if (arr2.length === 1) {
        setTimeout(() => {
            start();
        }, 1000);
    } else {
        setTimeout(() => {
            arr2 = arr2.slice(1, arr2.length);
            click(arr2);
        }, 1000);
    }
}
function remove() {
    for (var i = 0; i < document.querySelectorAll(".block").length; i++) {
        document.querySelectorAll(".block")[i].removeEventListener("click", other); // two anonymous functions are always different.
    }
    for (var i = 0; i < document.querySelectorAll(".block").length; i++) {
        document.querySelectorAll(".block")[i].removeEventListener("click", only); // two anonymous functions are always different.
    }
    for (var i = 0; i < document.querySelectorAll(".block").length; i++) {
        document.querySelectorAll(".block")[i].removeEventListener("click", start); // two anonymous functions are always different.
    }
    //document.querySelector("article").parentNode.replaceChild(document.querySelector("article").cloneNode(true), document.querySelector("article"));
}
