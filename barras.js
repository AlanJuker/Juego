function Barra(x,y,l,a){
    var options = {
        friction: 0,
        restitution: 0,
        angle: a,
        isStatic: true,        
        'group': -1,
        'category': 2,
        'mask': 0,
    }
    this.body = Bodies.rectangle(x,y,l,l, options);

    
    this.w = l;
    this.h = l;
    World.add(world,this.body);

    this.show = function(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(4);
        stroke(255);
        fill(122, 206, 103);
        rect(0,0,this.w, this.h);
        pop();
    }
}