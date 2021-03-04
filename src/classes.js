class Player{
    constructor(x, y){
        this._x = x;
        this._y = y;
    }
    
    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
    set x(value){
        value = parseInt(value);
        if (value >= 0) this._x = value;
    }
    set y(value){
        value = parseInt(value);
        if (value >= 0) this._y = value; 
    }
}

export {Player};