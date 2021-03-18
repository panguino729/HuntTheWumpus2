import * as classes from "./classes.js";

// Holds all of the arrays and constant data needed for the game to run
// -- Level Key --
// 0 = Nothing
// 1 = Player Start
// 2 = Wumpus
// 3 = Treasure
// 4 = Pit
// 5 = Bat
// 6 = Exit

let playerSpawnCount = 0;
const playerSpawnMax = 1;

let wumpusSpawnCount = 0;
const wumpusSpawnMax = 1;

let wumpusX;
let wumpusY;

let treasureSpawnCount = 0;
const treasureSpawnMax = 1;

let pitSpawnCount = 0;
const pitSpawnMax = 0;

let batSpawnCount = 0;
const batSpawnMax = 0;

let exitSpawnCount = 0;
const exitSpawnMax = 1;

let totalEntityCount = 0;
const maxEntityCount = playerSpawnMax + wumpusSpawnMax + treasureSpawnMax + pitSpawnMax + batSpawnMax + exitSpawnMax; 

let mapX = 15;
let mapY = 10;

let map = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
    [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
    [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
    [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
    [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
    [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
    [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
    [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
    [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
    [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

let player;

// Debug funtion - prints map to console
function checkMap(){
    console.table(map);
}

// generates the map
function MapGen(){
    for (let i = 0; i < maxEntityCount; i++)
    {
        // Get random int between (1 - mapX/mapY)
        let randMapX = Math.floor(Math.random() * (mapX - 1)) + 0;
        let randMapY = Math.floor(Math.random() * (mapY - 1)) + 0;
        // map[row][column] so Y first than X
        if (map[randMapY][randMapX] != 0 && totalEntityCount < maxEntityCount)
        {
            i--;
        }
        else if(map[randMapY][randMapX] == 0 && totalEntityCount < maxEntityCount)
        {
            // Player
            if (playerSpawnCount < playerSpawnMax)
            {
                map[randMapY][randMapX] = 1;
                playerSpawnCount++;
                totalEntityCount++;
                player = new classes.Player(randMapX, randMapY);
            }
            else
            {
                // Wumpus
                if (wumpusSpawnCount < wumpusSpawnMax)
                {
                    map[randMapY][randMapX] = 2;
                    wumpusX = randMapX;
                    wumpusY = randMapY;
                    wumpusSpawnCount++;
                    totalEntityCount++;
                }
                else
                {
                    // Treasure
                    if (treasureSpawnCount < treasureSpawnMax)
                    {
                        map[randMapY][randMapX] = 3;
                        treasureSpawnCount++;
                        totalEntityCount++;
                    }
                    else
                    {
                        // Pit
                        if (pitSpawnCount < pitSpawnMax)
                        {
                            map[randMapY][randMapX] = 4;
                            pitSpawnCount++;
                            totalEntityCount++;
                        }
                        else
                        {
                            // Bats
                            if (batSpawnCount < batSpawnMax)
                            {
                                map[randMapY][randMapX] = 5;
                                batSpawnCount++;
                                totalEntityCount++;
                            }
                            else
                            {
                                if (exitSpawnCount < exitSpawnMax){
                                    map[randMapY][randMapX] = 6;
                                    exitSpawnCount++;
                                    totalEntityCount++;
                                }
                                else{
                                    //Do nothing, the map is full
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (totalEntityCount = maxEntityCount)
        {
            //Do nothing, the map is full
        }
    }
};

// resets the map
function restart(){
    playerSpawnCount = 0;
    wumpusSpawnCount = 0;
    treasureSpawnCount = 0;
    pitSpawnCount = 0;
    batSpawnCount = 0;
    exitSpawnCount = 0;
    totalEntityCount = 0;
    
    map = [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];
    
    MapGen();
}

export {MapGen, checkMap, mapX, mapY, map, player, wumpusX, wumpusY, restart};
