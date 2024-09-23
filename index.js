const SHAPES = [
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [
        [0,1,0],  
        [0,1,0],  
        [1,1,0]   
    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    [
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ],
    [
        [1,1],
        [1,1],
    ]
]
const COLORS = [
    "#fff",
    "#9b5fe0",
    "#16a4d8",
    "#60dbe8",
    "#8bd346",
    "#efdf48",
    "#f9a52c",
    "#d64e12"
]

var score=0;
const rows=20;
const cols=10;
let grid = generateGrid();
let canvas=document.querySelector("#tetris");
let ctx=canvas.getContext("2d");//Api related drwas a 2d shape on the canvas;
ctx.scale(30,30);
var scoreboard=document.querySelector("h2");

function randomPieceObject(){ //generator
    let ran = Math.floor(Math.random()*7);

    let piece=SHAPES[ran];
    let rcolor=ran+1;
    let x=4;
    let y=0;
    return {piece,x,y,rcolor};
}
let pieceobj=randomPieceObject();//interconnection1
randomPiece();//interconnection2

function randomPiece(){//render piece
    let piece=pieceobj.piece;
    for(var i=0;i<piece.length;i++){
        for(var j=0;j<piece[i].length;j++){
            if(piece[i][j]==1){
                ctx.fillStyle=COLORS[pieceobj.rcolor];
                ctx.fillRect(pieceobj.x + j, pieceobj.y+i, 1, 1);//coordinates;
                
            }
        }
    }
     
}

setInterval(newState,500);
function newState(){
    checkgrid();
    if(pieceobj==null){
        pieceobj=randomPieceObject();
        
    }
    movedown();//falling effect

}




function generateGrid(){
    
    let grid=[];
    for(let i=0;i<rows;i++){
        grid.push([]);
        for(let j=0;j<cols;j++){
            grid[i].push(0)
        }
    }
    return grid;
}
function rendergid(){
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            ctx.fillStyle = COLORS[grid[i][j]];
            ctx.fillRect(j,i,1,1)
        }
    }
    randomPiece();
}


document.addEventListener("keydown",function(e){
    let key = e.key;
    if(key == "ArrowDown"){
        movedown();
    }else if(key == "ArrowLeft"){
        moveLeft();
    }else if(key == "ArrowRight"){
        moveRight();
    }else if(key == "ArrowUp"){
        rotate();
    }
})


function moveLeft(){
    if (!collision(pieceobj.piece, pieceobj.x - 1, pieceobj.y)){ 
       
    
    
    pieceobj.x-=1;}
    rendergid();
}
function movedown(){
    if (!collision(pieceobj.piece, pieceobj.x, pieceobj.y+1)){ 
        

    pieceobj.y+=1;}
    else
{
    for(var i=0;i<pieceobj.piece.length;i++){
        for(var j=0;j<pieceobj.piece[i].length;j++){
            if(pieceobj.piece[i][j]==1){
                let p=pieceobj.x+j;
                let q=pieceobj.y+i;
                grid[q][p]=pieceobj.rcolor;
            }
        }
    }
    if(pieceobj.y==0){
        alert("Gameover");
        grid=generateGrid();
    }
    pieceobj=null;
}
   
    rendergid();
}

function moveRight(){
    if (!collision(pieceobj.piece, pieceobj.x + 1, pieceobj.y)) {
    
    pieceobj.x+=1;}
    rendergid();
}
function collision(piece, x, y) {
    for (var i = 0; i < piece.length; i++) {
        for (var j = 0; j < piece[i].length; j++) {
            if (piece[i][j] === 1) {
                let p = x + j; // Calculate the piece's position in the grid
                let q = y + i;
                
                // Check if the piece is out of bounds
                if (p < 0 || p >= cols || q < 0 || q >= rows) {
                    return true; // Out of bounds, collision detected
                }
                
                // Check if the piece is colliding with an already occupied grid cell
                if (grid[q][p] !== 0) {
                    return true; // Collision with another piece detected
                }
            }
        }
    }
    return false; // No collision
}
document.getElementById("leftBtn").addEventListener("click", function() {
    moveLeft();
});

document.getElementById("upBtn").addEventListener("click", function() {
    rotate();
});

document.getElementById("rightBtn").addEventListener("click", function() {
    moveRight();
});

document.getElementById("downBtn").addEventListener("click", function() {
    moveDown();
});


function rotate(){//Dsa type quetion rotating a 2d Array;buy 90*
    //Transpose the matrix;
    //then reverse each row;

    let rotate=[];
    let piece=pieceobj.piece;
    for(var i=0;i<piece.length;i++){
        rotate.push([]);
        for(var j=0;j<piece[i].length;j++){
            rotate[i].push(0);

        }
    }
    for(var i=0;i<piece.length;i++){
       
        for(var j=0;j<piece[i].length;j++){
            rotate[i][j]=piece[j][i];

        
        }
        }
        for(var i=0;i<rotate.length;i++){
            rotate[i]=rotate[i].reverse();
        }
        if (!collision(rotate, pieceobj.x, pieceobj.y)) {
            pieceobj.piece = rotate; // Apply rotation if no collision
        }

}
function checkgrid(){
    let count = 0;
    
    for(let i=0;i<grid.length;i++){
        let allFilled = true;
        for(let j=0;j<grid[0].length;j++){
            if(grid[i][j] == 0){
                allFilled = false
            }
        }
        if(allFilled){
            count++;
            grid.splice(i,1);
            grid.unshift([0,0,0,0,0,0,0,0,0,0]);
        }
    }
    if(count == 1){
        score+=10;
    }else if(count == 2){
        score+=30;
    }else if(count == 3){
        score+=50;
    }else if(count>3){
        score+=100
    }
    scoreboard.innerHTML = "Score: " + score;
}
