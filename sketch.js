let player;
let zombies = [];
let demons1 = [];
let blazes = [];
let zombieSpawnTime = 250;
let zombieMaxSpeed = 2;
let zombnum = 0;
let upgrade;
let demon1SpawnTime = 250;
let demon1MaxSpeed = 1;
let demonnum = 0;
let blazeSpawnTime = 250;
let blazeMaxSpeed = 0.75;
let blznum = 0;
let frame = 0;
let score = 0;
let gameState = 'title';
var bg;
let bl;
let dm1hp = 5;
let blzhp = 10000
var addNew = true;
function setup() {
  canvas = createCanvas(700, 700);
  canvas.parent('myCanvas');
  player = new Player();
  t = "Press R to start";
  note = "";
  bg = loadImage("assets/Background.png");
  myFont = loadFont("assets/PublicPixel.ttf");
  jpImage = loadImage("assets/pot0.png");
  jp1Image = loadImage("assets/pot1.png");
  jp2Image = loadImage("assets/pot2.png");
  dmImage = loadImage('assets/demon sprite0.png');
  dmImage1 = loadImage('assets/demon sprite0.png');
  dm1 = loadImage('assets/demon1.png')
  dm2 = loadImage('assets/demon2.png')
  title = loadImage("assets/title.png");
  title1 = loadImage("assets/title2.png");
  lose = loadImage("assets/Lose.png");
  lose1 = loadImage("assets/LoseTomb.png");
  bullet = loadImage("assets/bullet.png");
  peppers0 = loadImage('assets/peppers0.png');
  peppers1 = loadImage('assets/peppers1.png');
  peppers2 = loadImage('assets/peppers2.png');
  blz1 = loadImage('assets/blaze1.png');
  blz2 =loadImage('assets/blaze2.png');
  enemy = loadImage('assets/Enemies.png');
  control = loadImage('assets/Controls.png');

  jp = createSprite(0, 0 , 20, 20);
  var myAnimation = jp.addAnimation('floating', 'assets/pot3.png', 'assets/pot0.png');
  jp.addAnimation('moving', 'assets/pot1.png', 'assets/pot2.png');

  dm = createSprite(0, 0, 20, 20);
  var myAnimation = dm.addAnimation('floating', 'assets/demon sprite0.png', 'assets/demon sprite1.png');
  dm.addAnimation('moving', 'assets/demon sprite0.png', 'assets/demon sprite1.png');


  dm1 = createSprite (0, 0, 40, 40);
  var myAnimation = dm1.addAnimation('floating', 'assets/demon1.png', 'assets/demon2.png');
  dm1.addAnimation('moving', 'assets/demon2.png', 'assets/demon1.png');

  blz = createSprite (0, 0, 70, 70);
  var myAnimation = blz.addAnimation('floating', 'assets/blaze1.png', 'assets/blaze2.png');
  blz.addAnimation('moving', 'assets/blaze2.png', 'assets/blaze1.png');


  //create some background for visual reference

  //bl = createSprite (Bullet.pos.x, Bullet.pos.y, 5);

  //var myAnimation = bl.addAnimation('floating', 'assets/bullet.png', 'bullet2.png')

  //bl.addAnimation('moving', 'assets/bullet.png', 'bullet2.png')
}

function draw() {
  textFont(myFont);
  switch (gameState) {
    /* Each 'screen' that you want should be defined with a word,
    this word will correspond to a 'case' as seen below. The case
    will be followed by all of functions you want within that screen
    and end with a 'break;'. */
    case 'title':
      titleScreen();
      break;
    case 'controls':
        controls();
      break;
    case 'enemy':
        enemies();
      break;
    case 'restart':
      restart();
      break;
    case 'gameover':
      gameOver();
      break;
}
}


function restart() {
  push();
  //player = new Player();
  //zombies = [];
  //zombieSpawnTime = 300;
  //zombieMaxSpeed = 2;
  //score = 0; // don't forget to reset the score :D
  background(bg, 255, 215, 0);
  rectMode(CENTER);
  player.draw();
  player.update();
  zomb();
  dem1();
  blaz();
  notif();
  frame++;
  // add these
  fill (255, 255, 255);
  textAlign(CENTER);
  textSize(40);
  text(score, width/2, 75);
pop();

}


function mouseClicked() {
  player.shoot();
  if (upgrade >= 1){
    player.shoot2();
  }
  if (upgrade >= 2){
    player.shoot2();
    player.shoot3();
  }
}

function mouseDragged(){
  if (upgrade >= 3){
      player.shoot();
  }

}

function gameOver() {
  background(lose, 255, 215, 0);

background(lose1, 255, 215, 0);
  stroke(255);
  fill(255);
  textSize(75);
  textAlign(CENTER);

  textSize(20);
  text(t, width*0.25, height*0.76);



}

function controls() {
  background(control, 255, 215, 0);
  stroke(255);
  fill(255);
  textSize(75);
  textAlign(CENTER);

  textSize(25);
  text('Press "R" To Continue', width*0.5, height*0.86);
}

function enemies() {
  background(enemy, 255, 215, 0);
  stroke(255);
  fill(255);
  textSize(75);
  textAlign(CENTER);

  textSize(25);
  text('Press "R" To Continue', width*0.5, height*0.86);
}




function zomb() {
  push();
  for (let i = zombies.length - 1; i >= 0; i--) {
    zombies[i].draw();
    zombies[i].update();

    if (zombies[i].ateYou()) {
      gameState = 'gameover';
      zombies.splice(i, 100);
      break;
    }

    if (player.hasShot(zombies[i])) {
      score++;
      zombnum = zombnum - 1
      zombies.splice(i, 1);
    }
  }

  if (frame >= zombieSpawnTime && zombnum <= 20) {
    zombies.push(new Zombie(random(zombieMaxSpeed)));
    zombieSpawnTime *= 0.95;

    zombnum = zombnum + 1
  }
  if (frameCount % 1000 == 0) {
    zombieMaxSpeed += 0.01;
  }
  pop();
}

function dem1(){
push();
  for (let i = demons1.length - 1; i >= 0; i--) {
    demons1[i].draw();
    demons1[i].update();

    if (demons1[i].ateYou()) {
      gameState = 'gameover';
      demons1.splice(i, 100);
      break;
    }

    if (player.hasShot(demons1[i])) {
      dm1hp = dm1hp - 1;
    if (dm1hp === 0){
      score = score + 2;
      demonnum = demonnum - 1;
      demons1.splice(i, 1);
      dm1hp = 5;
    }
  }
}

  if (frame >= demon1SpawnTime && demonnum <= 20) {
    demons1.push(new Demon1(random(demon1MaxSpeed)));
    demon1SpawnTime *= 0.95;
    frame = 0;
    demonnum = demonnum + 1
  }
  if (frameCount % 1000 == 0) {
    demon1MaxSpeed += 0.01;
  }
pop();
}

function blaz(){
  push();
    for (let i = blazes.length - 1; i >= 0; i--) {
      blazes[i].draw();
      blazes[i].update();

      if (blazes[i].ateYou()) {
        gameState = 'gameover';
        blazes.splice(i, 100);
        break;
      }

      if (player.hasShot(blazes[i])) {
        blzhp = blzhp - 1;
      if (blzhp === 0){
        score = score + 1000;
        blznum = blznum - 1;
        blazes.splice(i, 1);
        blzhp = 10000;
      }
    }
  }

    if (frame >= blazeSpawnTime && blznum <= 1 && score >= 250) {
      blazes.push(new Blaze(random(blazeMaxSpeed)));
      blazeSpawnTime *= 0.99;

      blznum = blznum + 1
    }
    if (frameCount % 1000 == 0) {
      blazeMaxSpeed += 0.01;
    }
  pop();
  }



function titleScreen() {
  player = new Player();
  zombies = [];
  zombieSpawnTime = 250;
  zombieMaxSpeed = 2;
  demons1 = [];
  demon1SpawnTime = 250;
  demon1MaxSpeed = 1;
  blazes = [];
  blazeSpawnTime = 0;
  blazeMaxSpeed = 0.5;
  score = 0; // don't forget to reset the score :D
    background(title1, 255, 215, 0);

  background(title, 255, 215, 0);
stroke(255);
fill(255);
textSize(75);
textAlign(CENTER);

textSize(25);
text('Press "R" To Start Game', width*0.5, height*0.86);
}

function notif() {
  if (score >= 10 && upgrade === 0) {
    stroke(255);
    fill(255);
    textSize(75);
    textAlign(CENTER);
    note = "Upgrade to Double Shot!!!";
    textSize(25);
    text(note, width*0.5, height*0.86);

   }
  if (score >=50 && upgrade === 1) {
    stroke(255);
    fill(255);
    textSize(75);
    textAlign(CENTER);
    note = "Upgrade to Triple Shot!!!";
    textSize(25);
    text(note, width*0.5, height*0.86);
   }
   if (score >= 100 && upgrade === 2) {
     stroke(255);
     fill(255);
     textSize(75);
     textAlign(CENTER);
    note = "Upgrade to Drag Shot!!!";
     textSize(25);
     text(note, width*0.5, height*0.86);
}
}


function keyReleased() {

  if (gameState === 'title') {
    if (key === 'r' || key === 'R' ) {
      gameState = 'controls';
      upgrade = 0
    }
  }

   else if (gameState === 'controls') {
    if (key === 'r' || key === 'R' ) {
        gameState = 'enemy';
        upgrade = 0
    }
  }

  else if (gameState === 'enemy') {
    if (key === 'r' || key === 'R' ) {
        gameState = 'restart';
    }
  }

  else if (gameState === 'gameover') {
    if (key === 'r' || key === 'R' ) {
        gameState = 'restart';
        player = new Player();
        zombies = [];
        zombieSpawnTime = 250;
        zombieMaxSpeed = 2;
        demons1 = [];
        demon1SpawnTime = 250;
        demon1MaxSpeed = 1;
        blazes = [];
        blazeSpawnTime = 0;
        blazeMaxSpeed = 0.5;
        score = 0; // don't forget to reset the score :D
    }
  }

   if (score >= 10 && key === '1' || key ==='1') {
    upgrade = 1
    score = score - 10
    note = "";
    }
   if (score >=50 && key === '2' || key ==='2') {
    upgrade = 2
    score = score - 50
    note = "";
    }
    if (score >= 100 && key === '3' || key === '3') {
    upgrade = 3
    score = score - 100
    note = "";
}
}
