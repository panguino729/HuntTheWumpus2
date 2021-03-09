// Checks if the user input is a valid string
function validateInput(input){
	if (!input || !input.trim()){
		return false;
	}
	else {
		return true;
	}
}

// Checks what word the user enters
function checkInput(input){
	if (input.search("right") != -1){
		return 0;
	}
	else if (input.search("left") != -1){
		return 1;
	}
	else if (input.search("up") != -1){
		return 2;
	}
	else if (input.search("down") != -1){
		return 3;
	}
}

// Checks if the player movement is valid (won't fall off the map)
function checkMovement(map, player, direction){
	let mapX = map[0].length - 1;
	let mapY = map.length - 1;
	
	switch (direction){
		// Right
		case 0:
			if (player.x + 1 >= mapX){
				return false;
			}
			else return true;
			break;
		// Left
		case 1:
			if (player.x - 1 < 1){
				return false;
			}
			else return true;
			break;
		// Up
		case 2:
			if (player.y - 1 < 1){
				return false;
			}
			else return true;
			break;
		// Down
		case 3:
			if (player.y + 1 >= mapY){
				return false;
			}
			else return true;
			break;
		default:
			return true;
			break;
	}
}

// This is only checking within 1 block, needs to be changed to 2(?)
// Y first than X
function getProximity(map, player){
	let proximity = [];
	// NW
	if (map[player.y - 1][player.x - 1] > 0 && map[player.y - 1][player.x - 1] != null){
		proximity.push(map[player.y - 1][player.x - 1]);
	}
	// N
	if (map[player.y - 1][player.x] > 0 && map[player.y - 1][player.x] != null){
		proximity.push(map[player.y - 1][player.x]);
	}
	// NE
	if (map[player.y - 1][player.x + 1] > 0 && map[player.y - 1][player.x + 1] != null){
		proximity.push(map[player.y - 1][player.x + 1]);
	}
	// E
	if (map[player.y][player.x + 1] > 0 && map[player.y][player.x + 1] != null){
		proximity.push(map[player.y][player.x + 1]);
	}
	// SE
	if (map[player.y + 1][player.x + 1] > 0 && map[player.y + 1][player.x + 1] != null){
		proximity.push(map[player.y + 1][player.x + 1]);
	}
	// S
	if (map[player.y + 1][player.x] > 0 && map[player.y + 1][player.x] != null){
		proximity.push(map[player.y + 1][player.x]);
	}
	// SW
	if (map[player.y + 1][player.x - 1] > 0 && map[player.y + 1][player.x - 1] != null){
		proximity.push(map[player.y + 1][player.x - 1]);
	}
	// W
	if (map[player.y][player.x - 1] > 0 && map[player.y][player.x - 1] != null){
		proximity.push(map[player.y][player.x - 1]);
	}
	
	return proximity;
}

function checkProximity(proximity){
	let str = "";
	if (proximity.length == 0) return false;
	
	for (let i = 0; i < proximity.length; i++){
		let item = proximity[i];
		switch (item) {
			case 2:
				str = `You smell a terrible stench. ${str}`;
				break;
			case 3:
				str = `You see a glimmer nearby. ${str}`;
				break;
			case 4:
				str = `You feel a breeze. ${str}`;
				break;
			case 5:
				str = `You hear wings flapping. ${str}`;
				break;
			default:
				break;
		}
	}
	
	return str;
}

// Takes in new string to concat to previous, used for Game Text
function updateUI(output, previous){
	let str = output.fontcolor("red");
	let result = `${str}<br/>${previous}`
	return result;
}

// Draw the grid based on generated map
function drawGrid(ctx, map, player){
	let mapX = map[0].length - 1;
	let mapY = map.length - 1;
	// row
	for (let i = 1; i < mapY; i++){
		// column
		for (let j = 1; j < mapX; j++){
			// Player
			if (map[i][j] == 1){
				drawRect(ctx, (j - 1) * 40, (i - 1) * 40, 40, 40, "white");
			}
			// Wumpus
			else if (map[i][j] == 2){
				drawRect(ctx, (j - 1) * 40, (i - 1) * 40, 40, 40, "red");
			}
			// Treasure
			else if (map[i][j] == 3){
				drawRect(ctx, (j - 1) * 40, (i - 1) * 40, 40, 40, "yellow");
			}
			// Pit
			else if (map[i][j] == 4){
				drawRect(ctx, (j - 1) * 40, (i - 1) * 40, 40, 40, "blue");
			}
			// Bats
			else if (map[i][j] == 5){
				drawRect(ctx, (j - 1) * 40, (i - 1) * 40, 40, 40, "purple");
			}
			else{
				drawRect(ctx, (j - 1) * 40, (i - 1) * 40, 40, 40, "black");
			}
		}
	}
	
	drawCircle(ctx, (player.x - 1) * 40, (player.y - 1) * 40);
}

function drawRect(ctx, x, y, width = 40, height = 40, color = "black", strokeStyle = "none"){
	ctx.save();
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.fill();
	if (strokeStyle != "none"){
		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = 2;
		ctx.stroke();
	}
	ctx.closePath();
	ctx.restore();
}
		
function drawCircle(ctx, x, y, radius = 20, startAngle = 0, endAngle = Math.PI * 2, fillStyle = "green"){
	ctx.save();
	ctx.fillStyle = fillStyle;
	ctx.translate(x, y);
	ctx.beginPath();
	ctx.arc(0 + radius, 0 + radius, radius, startAngle, endAngle, false);
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

export {validateInput, updateUI, drawGrid, checkInput, checkMovement, getProximity, checkProximity};