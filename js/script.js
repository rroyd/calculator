const buttonsElement = document.querySelector(".buttons");
const calcDisplay = document.querySelector(".display h1");
const expressionReg = [
    /^\d+\s(-|\+|\*|\/|%){1}\s\d+$/,
    /^-\d+\s(-|\+|\*|\/|%){1}\s-\d+$/,
    /^\d+\s(-|\+|\*|\/|%){1}\s-\d+$/,
    /^-\d+\s(-|\+|\*|\/|%){1}\s\d+$/,
    /^\d+\.\d+\s(-|\+|\*|\/|%){1}\s\d+$/,
    /^\d+\s(-|\+|\*|\/|%){1}\s\d+\.\d+$/,
    /^\d+\.\d+\s(-|\+|\*|\/|%){1}\s\d+\.\d+$/,
    /^-\d+\.\d+\s(-|\+|\*|\/|%){1}\s-\d+\.\d+$/,
    /^-\d+\.\d+\s(-|\+|\*|\/|%){1}\s\d+\.\d+$/,
    /^\d+\.\d+\s(-|\+|\*|\/|%){1}\s\d+\.\d+$/
];
const integerReg = /^(\d+)|(-\d+)$/;
const floatReg = /^(\d+\.\d+)|(-\d+\.\d+)$/;
let buttons = [
    {
        className: "ac",
        text: "AC"
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
        className: "plus",
        text: "+"
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
const expressions = ["+", "-", "%", "/", "*"];

let display = "";
let result = "";

let buttonElements = [];

function validate(str, regex) {
    return regex.test(str);
}

buttons.forEach((button) => {
    let buttonToAppend = document.createElement("button");
    buttonToAppend.textContent = button.text;
    buttonToAppend.classList.add("button");
    buttonToAppend.classList.add(button.className);
    buttonElements.push(buttonToAppend);
    buttonsElement.appendChild(buttonToAppend);
});

const numberElements = buttonElements.filter((button) => !isNaN(Number(button.textContent)));
const expressionElements = buttonElements.filter((button) => expressions.some((exp) => exp == button.textContent));
const ac = buttonElements.filter((button) => button.textContent == "AC")[0];
const operantTurn = buttonElements.filter((button) => button.textContent == "+/-")[0];
const equals = buttonElements.filter((button) => button.textContent == "=")[0];
const decimal = buttonElements.filter((button) => button.textContent == ".")[0];

numberElements.forEach((number) => {
    number.addEventListener('click', () => {
        if(display == "-") {
            update(display + number.textContent);
        }
        else if (expressions.some((expression) => display[display.length - 1] === expression)) {
            update(display + " " + number.textContent);
        }
        else {
            update(display + number.textContent);
        }
    });
});

decimal.addEventListener('click', () => {
    if(validateExpression(display)) {
        let elements = display.split(" ");
        if(elements[2].indexOf(".") == -1) {
            update(display + ".");
        }   
    }
    else if(display == "") {
        update("0.");
    }
    else if(integerReg.test(display)) {
        update(display + ".");
    }
    else if(display.indexOf(".") === -1) {
        update(display + ".");
    }
    else {
        expressions.forEach((expression) => {
            if(display.endsWith(expression)) {
                update(display + " 0.");
            }
        })
    }
})

expressionElements.forEach((expression) => {
    expression.addEventListener('click', (e) => {
        calculate();
        if ((floatReg.test(display) || integerReg.test(display)) && !expressions.some((exp) => exp == display[display.length - 1])) {
            display += " " + expression.textContent;
            calcDisplay.textContent = display;
        }
        else if (display == "" && e.target.textContent == "-") {
            update("-");
        }
    });
});

ac.addEventListener('click', () => {
    update("");
});

operantTurn.addEventListener('click', () => {
    if(!validateExpression(display) || display != "")
    {
        update(Number(display) * (-1));
    }
});

equals.addEventListener("click", () => calculate());

const calculate = function() {
    if (validateExpression(display)) {
        let elements = display.split(" ");
        switch (elements[1]) {
            case "%":
                update(((Number(elements[0]) * 10) % (Number(elements[2]) * 10)) / 10);
                break;
            case "+":
                update(((Number(elements[0]) * 10) + (Number(elements[2]) * 10)) / 10);
                break;
            case "-":
                update(((Number(elements[0]) * 10) - (Number(elements[2]) * 10)) / 10);
                break;
            case "/":
                update(((Number(elements[0]) * 10) / (Number(elements[2]) * 10)) / 10);
                break;
            case "*":
                update(((Number(elements[0]) * 10) * (Number(elements[2]) * 10)) / 100);
                break;
        }
    }
}

const update = function (value) {
    display = value;
    calcDisplay.textContent = value;
}

const validateExpression = (str) => {
    return expressionReg.some((value) => value.test(str));
}