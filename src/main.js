import * as utils from "./utilities.js";
import * as data from "./data.js";
import * as audio from "./audio.js";
import * as audioCanvas from "./audioCanvas.js";

let ctx, canvas, aCtx, aCanvas;
const canvasWidth = 600, canvasHeight = 400;

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
	
	window.addEventListener("keydown", doKeyDown);
	
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	
	let form = document.querySelector("#controls");
	outputWindow = document.querySelector("#outputWindow");
	inputWindow = document.querySelector("#playerInput");
	submit = document.querySelector("#submit");
	
	data.MapGen();
	utils.drawGrid(ctx, data.map, data.player);
	// Check surroundings upon start
	if (utils.getProximity(data.map, data.player).length != 0){
		outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
	}
	
	let playButton = document.querySelector("#playPause");
	let restartButton = document.querySelector("#restart");
	
	restartButton.onclick = function() {
		data.restart();
		gameRun = true;
		treasureGot = false;
		utils.drawGrid(ctx, data.map, data.player);
		outputWindow.innerHTML = "";
	}
	
	playButton.onclick = e =>{
		// check if context is in suspended state (autoplay policy)
		if (audio.audioCtx.state == "suspended") {
			audio.audioCtx.resume();
		}
		console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
		if (e.target.dataset.playing == "no"){
			// if track is currently paused, play it
			audio.playCurrentSound();
			e.target.dataset.playing = "yes"; // our CSS will set the text to "Pause"
			// if track IS playing, pause it
		}else{
			audio.pauseCurrentSound();
			e.target.dataset.playing = "no"; // our CSS will set the text to "Play"
		}
	};
	
	data.checkMap();
	update();
}

function update(){
	requestAnimationFrame(update);
	// Find distance between player and wumpus
	let distance = Math.pow((data.player.x - data.wumpusX),2) + Math.pow((data.player.y - data.wumpusY),2);
	let sqrDistance = Math.sqrt(distance);
	let fixDistance = (1/sqrDistance).toFixed(2);
	
	if(sqrDistance == 0){
		audio.setVolume(1);
		audioCanvas.draw(1);
	}
	else{
		audio.setVolume(fixDistance);
		audioCanvas.draw(fixDistance);
	}
}

// Update the output window with the user input
function updateUI(output, previous){
	let result = `${output.trim()}<br/>${previous}`;
	return result;
}

//function for keyboard input
function doKeyDown(e){
	let mapX = data.map[0].length - 1;
	let mapY = data.map.length - 1;
	
	if (gameRun == false)
		{
			return;
		}
	
	//The W Key -- Up
	if ( e.keyCode == 87 ) {
		// check if context is in suspended state (autoplay policy)
		if (audio.audioCtx.state == "suspended") {
			audio.audioCtx.resume();
		}
		// Check if movement valid
		if (data.player.y - 1 < 1){
			outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
		}
		else{
			data.player.y--;
			outputWindow.innerHTML = updateUI("Up", outputWindow.innerHTML);
			// if player moved to open square
			if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
			// if not, check where moved
			else{
				outputWindow.innerHTML = checkCurrent(data.map, data.player, outputWindow.innerHTML);
				if (gameRun == false){
					console.log("END");
				}
			}
			// update map
			utils.drawGrid(ctx, data.map, data.player);
			
			// check proximity to user
			if (utils.getProximity(data.map, data.player).length != 0){
				outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
			}
		}
	}
	
	//The S Key -- Down
	if ( e.keyCode == 83 ) {
		// check if context is in suspended state (autoplay policy)
		if (audio.audioCtx.state == "suspended") {
			audio.audioCtx.resume();
		}
		// Check if movement valid
		if (data.player.y + 1 >= mapY){
			outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
		}
		else{
			data.player.y++;
			outputWindow.innerHTML = updateUI("Down", outputWindow.innerHTML);
			// if player moved to open square
			if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
			// if not, check where moved
			else{
				outputWindow.innerHTML = checkCurrent(data.map, data.player, outputWindow.innerHTML);
				if (gameRun == false){
					console.log("END");
				}
			}
			// update map
			utils.drawGrid(ctx, data.map, data.player);
			
			// check proximity to user
			if (utils.getProximity(data.map, data.player).length != 0){
				outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
			}
		}
	}
	
	//The A Key -- Left
	if ( e.keyCode == 65 ) {
		// check if context is in suspended state (autoplay policy)
		if (audio.audioCtx.state == "suspended") {
			audio.audioCtx.resume();
		}
		// Check if movement valid
		if (data.player.x - 1 < 1){
			outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
		}
		else{
			data.player.x--;
			outputWindow.innerHTML = updateUI("Left", outputWindow.innerHTML);
			// if player moved to open square
			if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
			// if not, check where moved
			else{
				outputWindow.innerHTML = checkCurrent(data.map, data.player, outputWindow.innerHTML);
				if (gameRun == false){
					console.log("END");
				}
			}
			// update map
			utils.drawGrid(ctx, data.map, data.player);
			
			// check proximity to user
			if (utils.getProximity(data.map, data.player).length != 0){
				outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
			}
		}
		
	}
	
	//The D Key -- Right
	if ( e.keyCode == 68 ) {
		// check if context is in suspended state (autoplay policy)
		if (audio.audioCtx.state == "suspended") {
			audio.audioCtx.resume();
		}
		// Check if movement valid
		if (data.player.x + 1 >= mapX){
			outputWindow.innerHTML = utils.updateUI("This is not a valid move", outputWindow.innerHTML);
		}
		else{
			data.player.x++;
			outputWindow.innerHTML = updateUI("Right", outputWindow.innerHTML);
			// if player moved to open square
			if (data.map[data.player.y][data.player.x] == 0) data.map[data.player.y][data.player.x] = 1;
			// if not, check where moved
			else{
				outputWindow.innerHTML = checkCurrent(data.map, data.player, outputWindow.innerHTML);
				if (gameRun == false){
					console.log("END");
				}
			}
			// update map
			utils.drawGrid(ctx, data.map, data.player);
			
			// check proximity to user
			if (utils.getProximity(data.map, data.player).length != 0){
				outputWindow.innerHTML = utils.updateUI(utils.checkProximity(utils.getProximity(data.map, data.player)), outputWindow.innerHTML);
			}
		}
	}
}

// Checks current tile player is on
function checkCurrent(map, player, previous){
	let spot = map[player.y][player.x];
	let str = "";
	
	switch (spot) {
		case 2:
			str = utils.updateUI(`Oh no you woke up the Wumpus and were unable to escape! You died`, previous);
			map[player.y][player.x] = 7;
			gameRun = false;
			break;
		case 3:
			str = utils.updateUI(`You found the treasure!`, previous);
			map[player.y][player.x] = 8;
			treasureGot = true;
			break;
		case 4:
			str = utils.updateUI(`You fell into a pit. You died`, previous);
			map[player.y][player.x] = 9;
			gameRun = false;
			break;
		case 5:
			str = utils.updateUI(`You were attacked by bats. You died`, previous);
			map[player.y][player.x] = 10;
			gameRun = false;
			break;
		case 6:
			if(treasureGot){
				str = utils.updateUI(`You found the exit. You are safe!`, previous);
				map[player.y][player.x] = 11;
				gameRun = false;
				break;
			}
			else
			{
				str = utils.updateUI(`You found the exit. Now go find the treasure!`, previous);
				map[player.y][player.x] = 11;
				break;
			}

			case 11:
			if(treasureGot){
				str = utils.updateUI(`You found the exit. You are safe!`, previous);
				gameRun = false;
				break;
			}
			else
			{
				str = utils.updateUI(`You found the exit. Now go find the treasure!`, previous);
				break;
			}
			
		default:
			str = previous;
			break;
		
	}
	
	return str;
}

export {init};