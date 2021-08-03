function Particle(x,y,r,fixed,img2){
    var options = {
        friction: 0,
        restitution: 0,
        isStatic: fixed
    }
    this.col = color(255, 227, 179);
    this.body = Bodies.circle(x,y,r,options);
    this.r = r;
    World.add(world,this.body);

    this.arriba =  function () {
        Body.applyForce( this.body, {x: this.body.position.x, y: this.body.position.y}, {x: 0, y: -0.025});
    }
    this.abajo =  function () {
        Body.applyForce( this.body, {x: this.body.position.x, y: this.body.position.y}, {x: 0, y: 0.025});
    }
    this.izquierda =  function () {
        Body.applyForce( this.body, {x: this.body.position.x, y: this.body.position.y}, {x: -0.025, y: 0});
    }
    this.derecha =  function () {
        Body.applyForce( this.body, {x: this.body.position.x, y: this.body.position.y}, {x: 0.025, y: 0});
    }

    /*this.isOffScreen= function(){
        var pos = this.body.position;
        return (pos.y > height + 100);
    }*/

    this.removeFrowWorld = function(){
        World.remove(world, this.body);
    }

    this.show = function(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        noStroke();
        fill(255,0,0,0);
        image(img2,0-r/2-r,0-r/2-r, r*3,r*3);
        ellipse(0,0,this.r*2);
        pop();
    }

}