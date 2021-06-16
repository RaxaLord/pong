const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
let speed = 5;
const player1 = { x: 50, y: 50, speed:5, width:35, height:100, score:0};
const keyz1 = { ArrowRight: false, ArrowLeft: false, ArrowUp: false, ArrowDown: false };
const player2 = { x: 550, y: 50, speed:5, width:35, height:100, score:0};
const keyz2 = { KeyD: false, KeyA: false, KeyW: false, KeyS: false };
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 10,
    height: 10,
    xs: speed,
    ys: -speed
}
const div = document.createElement('div')
const btn = document.createElement('button');
btn.textContent = 'Game Reset'
btn.addEventListener('click', () => {
    //reset game
    player1.score = 0;
    player2.score = 0;
    ballReset();
    player1.x = 50;
    player2.x = canvas.width - (50 + player2.width);
    player1.y = canvas.height/2 - player1.height/ 2;
    player2.y = canvas.height/2 - player2.height/ 2;
})
document.body.prepend(div)
div.append(btn)

requestAnimationFrame(draw);
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
}
// function to follow key release
function keyUp(e) {
    if (e.code in keyz1) {
        keyz1[e.code] = false;
    }
    if (e.code in keyz2) {
        keyz2[e.code] = false;
    }
}
// moving function
// this function allows the player to move, it takes each keystroke and increases or decreases postion
function move() {
    if (keyz1.ArrowRight && player1.x < (canvas.width/2-player1.width)) {player1.x += player1.speed} else if (keyz1.ArrowLeft && player1.x > 0) {player1.x -= player1.speed};
    if (keyz1.ArrowUp) { player1.y -= player1.speed } else if (keyz1.ArrowDown) { player1.y += player1.speed };

    if (keyz2.KeyD && player2.x < (canvas.width-player2.width)) {player2.x += player2.speed} else if (keyz2.KeyA && player2.x > (canvas.width/2-player2.width)) {player2.x -= player2.speed};
    if (keyz2.KeyW) { player2.y -= player2.speed } else if (keyz2.KeyS) { player2.y += player2.speed };

    ball.x += ball.xs;
    ball.y += ball.ys;

    // update score if ball hits on side of wall
    if (ball.x < 0) {
        player2.score++;
        ballReset()
    }

    if (ball.x > canvas.width) {
        player1.score++;
        ballReset()
    }


    if ((ball.x < 0 || ball.x > canvas.width)) {
        ball.xs *= -1
    }
    if ((ball.y < 0 || ball.y > canvas.height)) {
        ball.ys *= -1
    }

    if (checkCol(ball, player1)) {
        ball.xs *= -1;
        let temp = ((player1.y + player1.height) / 2);
        let temp1 = ((ball.y + ball.height) / 2);
        if (temp < temp1) {
            ball.ys = speed
        } else {
            ball.ys = -speed
        }
        }
    
    if (checkCol(ball,player2)) {
        ball.xs *= -1;
        let temp = ((player2.y + player2.height) / 2);
        let temp1 = ((ball.y + ball.height) / 2);
        if (temp < temp1) {
            ball.ys = speed
        } else {
            ball.ys = -speed
        }
    }
}
// check collision
function checkCol(ob1, ob2) {
/*     if(ob1.x<ob2.x+ob2.width && ob1.x+ob1.width > ob2.x)
    {
        console.log('X hit')
    }

    if(ob1.y<ob2.y+ob2.height && ob1.y+ob1.height > ob2.y)
    {
        console.log('Y hit')
    } */
    let val = ob1.x<ob2.x+ob2.width && ob1.x+ob1.width > ob2.x && ob1.y<ob2.y+ob2.height && ob1.y+ob1.height > ob2.y
    if (val) {
        console.log(val);
    }
    return val;
}
function ballReset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.xs = speed;
    ball.ys = -speed
    }

// drawing function
// this function creates the 'animation' of a moving object, takes the input of the keystrokes and generates the styling while clearing its last position
function draw() {
    // clear history of drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    move();

    checkCol(player1, player2);

    // player 1
    ctx.fillStyle = 'blue';
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

    // player 2
    ctx.fillStyle = 'red';
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    
    // ball
    ctx.fillStyle = 'white';
    ctx.fillRect(ball.x,ball.y,ball.width,ball.height)

    // track score
    // let output = `Player 1 X ${player1.x} Y ${player1.y} Player 2 X ${player2.x} Y ${player2.y}`;
    let output = `Player1 : ${player1.score} vs Player2 : ${player2.score}`

    // text content
    ctx.font = '18px serif';
    ctx.textAlign = 'center'
    ctx.fillStyle = 'white';
    ctx.fillText(output, 300, 30);

    requestAnimationFrame(draw);
}