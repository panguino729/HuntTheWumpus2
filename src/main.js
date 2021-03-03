import * as utils from "./utilities.js";

let ctx, canvas;
const canvasWidth = 600, canvasHeight = 400;

let outputWindow, inputWindow, output, input;
let submit;

function init(){
	canvas = document.querySelector('canvas');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");
	
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	
	outputWindow = document.querySelector("#outputWindow");
	inputWindow = document.querySelector("#playerInput");
	submit = document.querySelector("#submit");
	
	submit.onclick = updateUI;
}

// Update the output window with the user input
function updateUI(){
	output = inputWindow.value;
	
	if (utils.validateInput(output)){
		outputWindow.innerHTML = `${output}<br/>${outputWindow.innerHTML}`;
		inputWindow.value = null;
	}
	console.log(inputWindow.value);
}

export {init};