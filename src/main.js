import * as utils from "./utilities.js";
import * as data from "./data.js";

let ctx, canvas;
const canvasWidth = 600, canvasHeight = 400;

let outputWindow, inputWindow, output, input;
let submit;

let direction;

function init(){
	canvas = document.querySelector('canvas');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");
	
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	
	outputWindow = document.querySelector("#outputWindow");
	inputWindow = document.querySelector("#playerInput");
	submit = document.querySelector("#submit");
	
	submit.onclick = update;
	
	data.MapGen();
	utils.drawGrid(ctx, data.map, data.player);
	data.checkMap();
}

function update(){
	updateUI();
	
	switch (direction) {
		case 0:
			if (utils.checkMovement(data.map, data.player, 0)){
				data.player.x++;
				data.map[data.player.y][data.player.x] = 1;
				utils.drawGrid(ctx, data.map, data.player);
			}
			else {
				let str = "This is not a valid move";
				let result = str.fontcolor("red");
				outputWindow.innerHTML = `${result}<br/>${outputWindow.innerHTML}`
			}
			break;
		case 1:
			if (utils.checkMovement(data.map, data.player, 1)){
				data.player.x--;
				data.map[data.player.y][data.player.x] = 1;
				utils.drawGrid(ctx, data.map, data.player);
			}
			else {
				let str = "This is not a valid move";
				let result = str.fontcolor("red");
				outputWindow.innerHTML = `${result}<br/>${outputWindow.innerHTML}`
			}
			break;
		case 2:
			if (utils.checkMovement(data.map, data.player, 2)){
				data.player.y--;
				data.map[data.player.y][data.player.x] = 1;
				utils.drawGrid(ctx, data.map, data.player);
			}
			else {
				let str = "This is not a valid move";
				let result = str.fontcolor("red");
				outputWindow.innerHTML = `${result}<br/>${outputWindow.innerHTML}`
			}
			break;
		case 3:
			if (utils.checkMovement(data.map, data.player, 3)){
				data.player.y++;
				data.map[data.player.y][data.player.x] = 1;
				utils.drawGrid(ctx, data.map, data.player);
			}
			else {
				let str = "This is not a valid move";
				let result = str.fontcolor("red");
				outputWindow.innerHTML = `${result}<br/>${outputWindow.innerHTML}`
			}
			break;
		default:
			break;
	}
}

// Update the output window with the user input
function updateUI(){
	output = inputWindow.value;
	
	if (utils.validateInput(output)){
		outputWindow.innerHTML = `${output}<br/>${outputWindow.innerHTML}`;
		inputWindow.value = null;
		direction = utils.checkInput(output);
	}
	console.log(inputWindow.value);
}

export {init};