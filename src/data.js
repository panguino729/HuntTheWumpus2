// Holds all of the arrays and constant data needed for the game to run
// -- Level Key --
// 0 = Nothing
// 1 = Player Start
// 2 = Wumpus
// 3 = Treasure
// 4 = Pit
// 5 = Bat

let playerSpawnCount = 0;
let playerSpawnMax = 1;

let wumpusSpawnCount = 0;
let wumpusSpawnMax = 1;

let treasureSpawnCount = 0;
let treasureSpawnMax = 1;

let pitSpawnCount = 0;
let pitSpawnMax = 0;

let batSpawnCount = 0;
let batSpawnMax = 0;

let totalEntityCount = playerSpawnMax + wumpusSpawnMax + treasureSpawnMax + pitSpawnMax + batSpawnMax; 

let mapX = 15;
let mapY = 10;

let map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

function MapGen(){
    for (let i = 0; i < totalEntityCount; i++)
    {
        randMapX = Math.random(0,mapX);
        randMapY = Math.random(0,mapY);
        if(map[randMapX,randMapY] != 0)
        {
            i--;
        }
        else
        {
            
        }
    }
};
