const progBar = document.getElementById("progBar");
const numberInput = document.getElementById("numberInput");
const animateToggle = document.getElementById("animateToggle");
const hideToggle = document.getElementById("hideToggle");

const progressDiv = document.getElementById("progressDiv");

const radius = progBar.r.baseVal.value;
const circleLength = radius * 2 * Math.PI;

let inputValue = 0;

progBar.style.strokeDasharray = circleLength + " " + circleLength;
progBar.style.strokeDashoffset = circleLength;
progBar.style.transition = "stroke-dashoffset 0.2s";


let animateInterval;


console.log(circleLength);


function setProg(percent) {
    progBar.style.strokeDashoffset = circleLength * (1 - (percent / 100));
}


numberInput.addEventListener('change', () => {
    if (numberInput.value < 0) numberInput.value = 0;
    if (numberInput.value > 100) numberInput.value = 100;
    inputValue = numberInput.value;
    setProg(inputValue);
})

hideToggle.addEventListener('change', () => {
    if (hideToggle.checked == true) {
        if (animateToggle.checked == true) {
            animateToggle.checked = false;
            clearInterval(animateInterval);
        }
        progressDiv.style.display = "none";
    }
    else {
        progressDiv.style.display = "flex";
    }
})

animateToggle.addEventListener('change', () => {
    if (animateToggle.checked == true) {
        if (hideToggle.checked == true) {
            hideToggle.checked = false;
            progressDiv.style.display = "flex";
        }
        animateInterval = setInterval(() => {
            if (inputValue > 100) {
                inputValue = 0;
                progBar.style.transitionDuration = "0s";
            }
            else {
                inputValue++;
                progBar.style.transitionDuration = "0.2s";
            }
            setProg(inputValue);
        }, 50);
    }
    else {
        clearInterval(animateInterval);
    }
})