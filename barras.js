function Barra(x,y,l,a){
    var activado = false;
    var options = {
        friction: -1,
        restitution: -1,
        angle: a,
        isStatic: true,        
        group: -1,
        category: 2,
        mask: 0,
        wireframes: false
    }
    this.col = color(255,0,0,0);
    this.body = Bodies.rectangle(x,y,l,l, options);
/*
    this.activar = function(){
            World.remove(world, this.body);
            this.body = Bodies.rectangle(x,y,l,l, options);
            this.w = l;
            this.h = l;
            World.add(world,this.body);
            var pos = this.body.position;
            var angle = this.body.angle;
    
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            rectMode(CENTER);
            strokeWeight(4);
            stroke(255);
            fill(255,255,255);
            rect(0,0,this.w, this.h);
            pop();
            activado=true;
       
    }

    this.desactivar = function(){
            World.remove(world, this.body);
            this.body = Bodies.rectangle(x,y,l,l, options);
            this.w = l;
            this.h = l;
            World.add(world,this.body);
            var pos = this.body.position;
            var angle = this.body.angle;
    
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            rectMode(CENTER);
            strokeWeight(4);
            stroke(255);
            fill(255,0,0,0);
            rect(0,0,this.w, this.h);
            pop();
        
    }
    */
    this.removeFrowWorld = function(){
        World.remove(world, this.body);
    }

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
        fill(this.col);
        rect(0,0,this.w, this.h);
        pop();
    }

    
    this.changeColor = function(){
        this.col = color(255);
    }
}