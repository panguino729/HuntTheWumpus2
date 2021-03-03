// Holds all of the arrays and constant data needed for the game to run
// -- Level Key --
// 0 = Nothing
// 1 = Player Start
// 2 = Wumpus
// 3 = Treasure
// 4 = Pit
// 5 = Bat

let playerSpawnCount = 0;
const playerSpawnMax = 1;

let wumpusSpawnCount = 0;
const wumpusSpawnMax = 1;

let treasureSpawnCount = 0;
const treasureSpawnMax = 1;

let pitSpawnCount = 0;
const pitSpawnMax = 0;

let batSpawnCount = 0;
const batSpawnMax = 0;

let totalEntityCount = 0;
const maxEntityCount = playerSpawnMax + wumpusSpawnMax + treasureSpawnMax + pitSpawnMax + batSpawnMax; 

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

function checkMap(){
    console.table(map);
}

function MapGen(){
    for (let i = 0; i < maxEntityCount; i++)
    {
        // Get random int between (0 - mapX/mapY)
        let randMapX = Math.floor(Math.random() * (mapX - 0)) + 0;
        let randMapY = Math.floor(Math.random() * (mapY - 0)) + 0;
        // map[row][column] so Y first than X
        if (map[randMapY][randMapX] != 0 && totalEntityCount < maxEntityCount)
        {
            i--;
        }
        else if(map[randMapY][randMapX] == 0 && totalEntityCount < maxEntityCount)
        {
            if(playerSpawnCount < playerSpawnMax)
            {
                map[randMapY][randMapX] = 1;
                playerSpawnCount++;
                totalEntityCount++;
            }
            else
            {
                if(wumpusSpawnCount < wumpusSpawnMax)
                {
                    map[randMapY][randMapX] = 2;
                    wumpusSpawnCount++;
                    totalEntityCount++;
                }
                else
                {
                    if(treasureSpawnCount < treasureSpawnMax)
                    {
                        map[randMapY][randMapX] = 3;
                        treasureSpawnCount++;
                        totalEntityCount++;
                    }
                    else
                    {
                        if(pitSpawnCount < pitSpawnMax)
                        {
                            map[randMapY][randMapX] = 4;
                            pitSpawnCount++;
                            totalEntityCount++;
                        }
                        else
                        {
                            if(batSpawnCount < batSpawnMax)
                            {
                                map[randMapY][randMapX] = 5;
                                batSpawnCount++;
                                totalEntityCount++;
                            }
                            else
                            {
                                //Do nothing, the map is full
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

export {MapGen, checkMap};
