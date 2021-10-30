const buttonsElement = document.querySelector(".buttons");
let buttons = [
    {
        className: "AC",
        text: "AC"
    },
    {
        className: "operant-turn",
        text: "+/-"
    },
    {
        className: "precentage",
        text: "%"
    },
    {
        className: "operant-turn",
        text: "+/-"
    },
    {
        className: "divide",
        text: "/"
    },
    {
        className: "seven",
        text: 7
    },
    {
        className: "eight",
        text: 8
    },
    {
        className: "nine",
        text: 9
    },
    {
        className: "multiply",
        text: "*"
    },
    {
        className: "four",
        text: 4
    },
    {
        className: "five",
        text: 5
    },
    {
        className: "six",
        text: 6
    },
    {
        className: "minus",
        text: "-"
    },
    {
    className: "one",
    text: 1
    },
    {
    className: "two",
    text: 2
    },
    {
    className: "three",
    text: 3
    },
    {
        className: "zero",
        text: 0
    },
    {
        className: "decimal",
        text: "."
    },
    {
        className: "equals",
        text: "="
    }
];

let display = "";
let result = "";

buttons.forEach((button) => {
    let buttonToAppend = document.createElement("button");
    buttonToAppend.textContent = button.text;
    buttonToAppend.classList.add("button");
    buttonToAppend.classList.add(button.className);
    buttonsElement.appendChild(buttonToAppend);
});

