import * as utils from "./utilities.js";
import * as data from "./data.js";
import * as audio from "./audio.js";

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
	
	window.addEventListener("keydown", doKeyDown);

	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	
	let form = document.querySelector("#controls");
	outputWindow = document.querySelector("#outputWindow");
	inputWindow = document.querySelector("#playerInput");
	submit = document.querySelector("#submit");
	
	// inputWindow.addEventListener("keypress", function (e) {
	// 	if (e.keyCode == 13){
	// 		e.stopPropagation();
	// 		e.preventDefault();
	// 		submit.click();
	// 	}
	// })

	audio.AudioSetup();

	// submit.onclick = update;
	
	outputWindow.innerHTML = utils.updateUI(`Welcome to Hunt the Wumpus! You are the green circle. Navigate through the cave by typing directions ("right", "left", "up", "down") into the text field below then pressing enter. Escape the cave with the treasure while avoiding the Wumpus.`, outputWindow.innerHTML);
	
	data.MapGen();
	utils.drawGrid(ctx, data.map, data.player);
	// Check surroundings upon start
	if (utils.getProximity(data.map, data.player).length != 0){
		outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
	}
	data.checkMap();
}

function update(){
	updateUI();
	
	// Player movement
// 	switch (direction) {
// 		// Right
// 		case 0:
// 			if (utils.checkMovement(data.map, data.player, 0)){
// 				data.player.x++;
// 				if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
				
// 				utils.drawGrid(ctx, data.map, data.player);
				
// 				if (utils.getProximity(data.map, data.player).length != 0){
// 					outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
// 				}
// //				let str = utils.checkMovement(utils.getProximity(data.map, data.player));
// //				let result = str.fontcolor("red");
// //				outputWindow.innerHTML = `${result}<br/>${outputWindow.innerHTML}`;
// 			}
// 			else {
// 				outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
// 			}
// 			break;
// 		// Left
// 		case 1:
// 			if (utils.checkMovement(data.map, data.player, 1)){
// 				data.player.x--;
// 				if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;

// 				utils.drawGrid(ctx, data.map, data.player);
				
// 				if (utils.getProximity(data.map, data.player).length != 0){
// 					outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
// 				}
// 			}
// 			else {
// 				outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
// 			}
// 			break;
// 		// Up
// 		case 2:
// 			if (utils.checkMovement(data.map, data.player, 2)){
// 				data.player.y--;
// 				if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;

// 				utils.drawGrid(ctx, data.map, data.player);
				
// 				if (utils.getProximity(data.map, data.player).length != 0){
// 					outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
// 				}

// 			}
// 			else {
// 				outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
// 			}
// 			break;
// 		// Down
// 		case 3:
// 			if (utils.checkMovement(data.map, data.player, 3)){
// 				data.player.y++;
// 				if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
				
// 				utils.drawGrid(ctx, data.map, data.player);
				
// 				if (utils.getProximity(data.map, data.player).length != 0){
// 					outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
// 				}

// 			}
// 			else {
// 				outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
// 			}
// 			break;
// 		default:
// 			break;
// 	}
}

// Update the output window with the user input
function updateUI(){
	output = inputWindow.value;
	
	if (utils.validateInput(output)){
		outputWindow.innerHTML = `${output.trim()}<br/>${outputWindow.innerHTML}`;
		inputWindow.value = null;
		direction = utils.checkInput(output);
	}
	console.log(inputWindow.value);
}


//function for keyboard input
function doKeyDown(e){
	let mapX = data.map[0].length - 1;
	let mapY = data.map.length - 1;


	//The W Key -- Up
	if ( e.keyCode == 87 ) {
		if (data.player.y - 1 < 1){

		}
		else{
			data.player.y--;
			if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
	
			utils.drawGrid(ctx, data.map, data.player);
			
			if (utils.getProximity(data.map, data.player).length != 0){
				outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
			}
		}
	}
	
	//The S Key -- Down
	if ( e.keyCode == 83 ) {
		if (data.player.y + 1 >= mapY){
			
		}
		else
		{
			data.player.y++;
			if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
			
			utils.drawGrid(ctx, data.map, data.player);
			
			if (utils.getProximity(data.map, data.player).length != 0){
				outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
			}
		}
	}
	
	//The A Key -- Left
	if ( e.keyCode == 65 ) {
		if (data.player.x - 1 < 1){
			
		}
		else{
			data.player.x--;
			if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
	
			utils.drawGrid(ctx, data.map, data.player);
			
			if (utils.getProximity(data.map, data.player).length != 0){
				outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
			}
		}
		
	}
	
	//The D Key -- Right
	if ( e.keyCode == 68 ) {
		if (data.player.x + 1 >= mapX){
			
		}
		else{
			data.player.x++;
			if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
					
			utils.drawGrid(ctx, data.map, data.player);
					
			if (utils.getProximity(data.map, data.player).length != 0){
				outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
			}
		}

		
	}
}

export {init};