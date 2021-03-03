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

function MapGen(){
    for (let i = 0; i < totalEntityCount; i++)
    {
        randMapX = Math.random(0,mapX);
        randMapY = Math.random(0,mapY);
        if(map[randMapX,randMapY] != 0 && totalEntityCount < maxEntityCount)
        {
            i--;
        }
        else if(map[randMapX,randMapY] == 0 && totalEntityCount < maxEntityCount)
        {
            if(playerSpawnCount < playerSpawnMax)
            {
                map[randMapX,randMapY] = 1;
                playerSpawnCount++;
                totalEntityCount++;
            }
            else
            {
                if(wumpusSpawnCount < wumpusSpawnMax)
                {
                    map[randMapX,randMapY] = 2;
                    wumpusSpawnCount++;
                    totalEntityCount++;
                }
                else
                {
                    if(treasureSpawnCount < treasureSpawnMax)
                    {
                        map[randMapX,randMapY] = 3;
                        treasureSpawnCount++;
                        totalEntityCount++;
                    }
                    else
                    {
                        if(pitSpawnCount < pitSpawnMax)
                        {
                            map[randMapX,randMapY] = 4;
                            pitSpawnCount++;
                            totalEntityCount++;
                        }
                        else
                        {
                            if(batSpawnCount < batSpawnMax)
                            {
                                map[randMapX,randMapY] = 5;
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

export {MapGen};
