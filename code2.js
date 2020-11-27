const canvas = document.querySelector("#draw");
const context = canvas.getContext("2d");
const inputs = document.querySelectorAll(".panels input");
let changeColor = document.querySelector("#basepanel");
let changeWidth = document.querySelector("#spacingrange");

//console.log(inputs);

canvas.width = window.innerWidth;
canvas.heigth = window.innerHeight;

context.strokeStyle = "pink";
context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
/*let hue = 0;*/
let direction = true;

function handleUpdate() {
  const suffix = this.dataset.sizing || "";

  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

let draw = function (e) {
  if (!isDrawing) return;
  console.log(e);

  context.strokeStyle = changeColor.value;
  context.lineWidth = changeWidth.value;

  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];

  /*hue++;
  if (hue >= 360) {
    hue = 0;
  }*/
  /* if (context.lineWidth >= 100 || context.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    context.lineWidth++;
  } else {
    context.lineWidth--;
  }*/
};

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
