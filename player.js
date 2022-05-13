class Player {
  constructor() {
    this.pos = createVector(width / 2, height / 2)
    this.angle = 0;
    this.bullets = []; // add this
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    //camera.position.x = this.pos.x
    //camera.position.y = this.pos.y
    //rrotate(this.angle);
        scale(0.25);
    drawSprites(jp);

    pop();

    for (let bullet of this.bullets) {  // add this
      bullet.update();
      bullet.draw();
    }
  }

  update() {
    let xSpeed = 0;
    let ySpeed = 0;
    if (keyIsDown(65)) {
      xSpeed = -2;
    }

    if (keyIsDown(68)) {
      xSpeed = 2;
    }

    if (keyIsDown(87)) {
      ySpeed = -2;
    }

    if (keyIsDown(83)) {
      ySpeed = 2;
    }
    this.pos.add(xSpeed, ySpeed);
    this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);


  }

  shoot() {
    this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle));
  }
  shoot2() {
      this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle - 5));
  }
  shoot3() {
      this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle + 5));
  }
  hasShot(zombie) {
  for (let i = 0; i < this.bullets.length; i++) {
    if (dist(this.bullets[i].x, this.bullets[i].y, zombie.pos.x, zombie.pos.y) < 15) {
      this.bullets.splice(i, 1);
      return true;
    }
  }
  return false;
}
hasShot(demon1) {
for (let i = 0; i < this.bullets.length; i++) {
  if (dist(this.bullets[i].x, this.bullets[i].y, demon1.pos.x, demon1.pos.y) < 30) {
    this.bullets.splice(i, 1);
    return true;
  }
}
return false;
}
}
