function Particle(x,y,r,fixed){
    var options = {
        friction: 0,
        restitution: 0,
        isStatic: fixed
    }
    this.body = Bodies.circle(x,y,r,options);
    this.r = r;
    World.add(world,this.body);

    this.arriba =  function () {
        Body.applyForce( this.body, {x: this.body.position.x, y: this.body.position.y}, {x: 0, y: -0.05});
    }
    this.abajo =  function () {
        Body.applyForce( this.body, {x: this.body.position.x, y: this.body.position.y}, {x: 0, y: 0.05});
    }
    this.izquierda =  function () {
        Body.applyForce( this.body, {x: this.body.position.x, y: this.body.position.y}, {x: -0.05, y: 0});
    }
    this.derecha =  function () {
        Body.applyForce( this.body, {x: this.body.position.x, y: this.body.position.y}, {x: 0.05, y: 0});
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
        fill(255, 227, 179);
        ellipse(0,0,this.r*2);
        pop();
    }
}