function Caja(x,y,l,fixed,img2){
    var options = {
        friction: 0,
        restitution: 0,
        isStatic: fixed
    }
    this.col = color(255, 227, 179);
    this.body = Bodies.rectangle(x,y,l,l, options);
    World.add(world,this.body);

    this.removeFrowWorld = function(){
        World.remove(world, this.body);
    }

    this.w = l;
    this.h = l;

    this.show = function(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        noStroke();
        fill(255,0,0,0);
        image(img2,0-l/2,0-l/2,l,l);
        rect(0,0,this.w, this.h);
        pop();
    }

}