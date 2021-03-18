import * as utils from "./utilities.js";
import * as data from "./data.js";
import * as audio from "./audio.js";
import * as audioCanvas from "./audioCanvas.js";

let ctx, canvas, aCtx, aCanvas;
const canvasWidth = 600, canvasHeight = 400;
const aCanvasWidth = 100, aCanvasHeight = 100;

let outputWindow, inputWindow, output, input;
let submit;

let direction;

let gameRun = true;
let treasureGot = false;

function init(){
	canvas = document.querySelector('#mainCanvas');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");

	audio.setupWebaudio("./audio/SnoringWumpus.mp3");
	aCanvas = document.querySelector('#audioCanvas');
	audioCanvas.setupCanvas(aCanvas, audio.analyserNode);
	//aCanvas.width = aCanvasWidth;
	//aCanvas.height = aCanvasHeight;
	//aCtx = aCanvas.getContext("2d");
	
	window.addEventListener("keydown", doKeyDown);
	
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	
	let form = document.querySelector("#controls");
	outputWindow = document.querySelector("#outputWindow");
	inputWindow = document.querySelector("#playerInput");
	submit = document.querySelector("#submit");

	
	outputWindow.innerHTML = utils.updateUI(`Welcome to Hunt the Wumpus! You are the green circle. Navigate through the cave by typing directions ("right", "left", "up", "down") into the text field below then pressing enter. Escape the cave with the treasure while avoiding the Wumpus.`, outputWindow.innerHTML);
	
	data.MapGen();
	utils.drawGrid(ctx, data.map, data.player);
	// Check surroundings upon start
	if (utils.getProximity(data.map, data.player).length != 0){
		outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
	}

	audio.playCurrentSound();
	data.checkMap();
	update();
}

function update(){
	requestAnimationFrame(update);
	let distance = Math.pow((data.player.x - data.wumpusX),2) + Math.pow((data.player.y - data.wumpusY),2);
	let sqrDistance = Math.sqrt(distance);
	let fixDistance = (1/sqrDistance).toFixed(2);
	console.log(`PlayerX: ${data.player.x}, PlayerY:  ${data.player.y}`);
	console.log(`WumpusX: ${data.wumpusX}, WumpusY:  ${data.wumpusY}`);
	console.log(`distance: ${distance}`);
	console.log(`sqrDistance: ${sqrDistance}`);
	console.log(`fixDistance: ${fixDistance}`);

	//console.log(`absDistance: ${absDistance}`);
	if(sqrDistance == 0){
		audio.setVolume(1);
	}
	else{
		audio.setVolume(fixDistance);
	}

	audioCanvas.draw(sqrDistance.toFixed(2));
}

// Update the output window with the user input
function updateUI(output, previous){
	//	output = inputWindow.value;
	//	
	//	if (utils.validateInput(output)){
	//		outputWindow.innerHTML = `${output.trim()}<br/>${outputWindow.innerHTML}`;
	//		inputWindow.value = null;
	//		direction = utils.checkInput(output);
	//	}
	//	console.log(inputWindow.value);
	let result = `${output.trim()}<br/>${previous}`;
	return result;
}


//function for keyboard input
function doKeyDown(e){
	let mapX = data.map[0].length - 1;
	let mapY = data.map.length - 1;
	
	
	//The W Key -- Up
	if ( e.keyCode == 87 ) {
		if (data.player.y - 1 < 1){
			outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
		}
		else{
			data.player.y--;
			outputWindow.innerHTML = updateUI("Up", outputWindow.innerHTML);
			if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
			else{
				outputWindow.innerHTML = checkCurrent(data.map, data.player, outputWindow.innerHTML);
				//gameRun = utils.gameEnd(data.map[data.player.y][data.player.x]);
				if (gameRun == false){
					console.log("END");
				}
			}
			
			utils.drawGrid(ctx, data.map, data.player);
			
			if (utils.getProximity(data.map, data.player).length != 0){
				outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
			}
		}
	}
	
	//The S Key -- Down
	if ( e.keyCode == 83 ) {
		if (data.player.y + 1 >= mapY){
			outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
		}
		else
			{
				data.player.y++;
				outputWindow.innerHTML = updateUI("Down", outputWindow.innerHTML);
				if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
				else{
					outputWindow.innerHTML = checkCurrent(data.map, data.player, outputWindow.innerHTML);
					//gameRun = utils.gameEnd(data.map[data.player.y][data.player.x]);
					if (gameRun == false){
						console.log("END");
					}
				}
				
				utils.drawGrid(ctx, data.map, data.player);
				
				if (utils.getProximity(data.map, data.player).length != 0){
					outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
				}
			}
	}
	
	//The A Key -- Left
	if ( e.keyCode == 65 ) {
		if (data.player.x - 1 < 1){
			outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
		}
		else{
			data.player.x--;
			outputWindow.innerHTML = updateUI("Left", outputWindow.innerHTML);
			if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
			else{
				outputWindow.innerHTML = checkCurrent(data.map, data.player, outputWindow.innerHTML);
				//gameRun = utils.gameEnd(data.map[data.player.y][data.player.x]);
				if (gameRun == false){
					console.log("END");
				}
			}
			
			utils.drawGrid(ctx, data.map, data.player);
			
			if (utils.getProximity(data.map, data.player).length != 0){
				outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
			}
		}
		
	}
	
	//The D Key -- Right
	if ( e.keyCode == 68 ) {
		if (data.player.x + 1 >= mapX){
			outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
		}
		else{
			data.player.x++;
			outputWindow.innerHTML = updateUI("Right", outputWindow.innerHTML);
			if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
			else{
				outputWindow.innerHTML = checkCurrent(data.map, data.player, outputWindow.innerHTML);
				//gameRun = utils.gameEnd(data.map[data.player.y][data.player.x]);
				if (gameRun == false){
					console.log("END");
				}
			}
			
			utils.drawGrid(ctx, data.map, data.player);
			
			if (utils.getProximity(data.map, data.player).length != 0){
				outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
			}
		}
	}
}

function checkCurrent(map, player, previous){
	let spot = map[player.y][player.x];
	let str = "";
	
	switch (spot) {
		case 2:
			str = utils.updateUI(`Oh no you woke up the Wumpus and were unable to escape! You died`, previous);
			gameRun = false;
			break;
		case 3:
			str = utils.updateUI(`You found the treasure!`, previous);
			treasureGot = true;
			break;
		case 4:
			str = utils.updateUI(`You fell into a pit. You died`, previous);
			gameRun = false;
			break;
		case 5:
			str = utils.updateUI(`You were attacked by bats. You died`, previous);
			gameRun = false;
			break;
		case 6:
			str = utils.updateUI(`You found the exit. You are safe!`, previous);
			gameRun = false;
			break;
		default:
			break;
	}
	
	return str;
}

export {init};