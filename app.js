const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

const player1 = { x: 50, y: 50, speed:5, width:15,height:100};
const keyz1 = { ArrowRight: false, ArrowLeft: false, ArrowUp: false, ArrowDown: false };

const player2 = { x: 550, y: 50, speed:5, width:15, height:100};
const keyz2 = { KeyD: false, KeyA: false, KeyW: false, KeyS: false };

draw();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// fucntion to follow key press
function keyDown(e) {
    if (e.code in keyz1) {
        keyz1[e.code] = true;
    }
    if (e.code in keyz2) {
        keyz2[e.code] = true;
    }
    // console.log(e.code)
    move();
}

// function to follow key release
function keyUp(e) {
    if (e.code in keyz1) {
        keyz1[e.code] = false;
    }
    if (e.code in keyz2) {
        keyz2[e.code] = false;
    }
    // console.log(keyz2)
}

// moving function
// this function allows the player to move, it takes each keystroke and increases or decreases postion
function move() {
    if (keyz1.ArrowRight) {player1.x += player1.speed} else if (keyz1.ArrowLeft) {player1.x -= player1.speed};
    if (keyz1.ArrowUp) { player1.y -= player1.speed } else if (keyz1.ArrowDown) { player1.y += player1.speed };

    if (keyz2.KeyD) {player2.x += player2.speed} else if (keyz2.KeyA) {player2.x -= player2.speed};
    if (keyz2.KeyW) { player2.y -= player2.speed } else if (keyz2.KeyS) { player2.y += player2.speed };

    draw();
}

// drawing function
// this function creates the 'animation' of a moving object, takes the input of the keystrokes and generates the styling while clearing its last position
function draw() {
    // clear history of drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // player 1
    ctx.fillStyle = 'blue';
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

    // player 2
    ctx.fillStyle = 'red';
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    
    // track output
    let output = `Player 1 X ${player1.x} Y ${player1.y} Player 2 X ${player2.x} Y ${player2.y}`;

    // text content
    ctx.font = '12px serif';
    ctx.textAlign = 'center'
    ctx.fillStyle = 'red';
    ctx.fillText(output, 300, 30);
}