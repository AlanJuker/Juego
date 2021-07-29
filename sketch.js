var Engine = Matter.Engine,
//Render = Matter.Render,
World = Matter.World;
Bodies = Matter.Bodies,
Constraint = Matter.Constraint,
Mouse = Matter.Mouse,
MouseConstraint = Matter.MouseConstraint;
Body = Matter.Body;

var engine;
var world;
var j=1;
var inicio = false;

var particles = [];
var boundaries = [];   
//var barras = []; 
//var barrasB = []; 

var ground;

var mConstraint;

let img;
let img2;
let img3;
var ancho =  window.innerWidth-30;
var largo = window.innerHeight-30;

function setup(){
    
    img = loadImage('/img/fondo.jpg');
    img2 = loadImage('/img/alien.png');
    img3 = loadImage('/img/senior.png');
    engine = Engine.create();
    var canvas = createCanvas(ancho,largo);

    
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    world = engine.world;
    //Engine.run(engine);

    var prev = null;
    /*for(var x=200; x<400; x+=20){

        var fixed= false;
        if(!prev){
            fixed = true;
        }

        var p = new Particle(x,100,10, false);
        particles.push(p);

        if(prev){
            var options = {
                bodyA: p.body,
                bodyB: prev.body,
                lenght: 20,
                stiffness: 0.4
            }
            var constraint = Constraint.create(options);
            World.add(world, constraint);
        }
        var prev = p;
    }*/

    //var p2 = new Particle(200,150,10);
    /*particles.push(p2);*/
    /*for(var x = 80; x<240; x+=40){
        var barra = new Barra(x,80,25,0);
        barras.push(barra);
        var barra = new Barra(x,80,25,0);
        barrasB.push(barra);
    }*/
    var arriba = new Boundary(width/2, 0+15, width, 30, 0),
    abajo = new Boundary(width/2, height-15, width, 30, 0),
    izquierda = new Boundary(0+15, height/2, width, 30, 1.5708),
    derecha = new Boundary(width-15, height/2, width, 30, 1.5708);

    boundaries.push(abajo);
    World.add(world, arriba);

    boundaries.push(izquierda);
    World.add(world, abajo);

    boundaries.push(arriba);
    World.add(world, izquierda);

    boundaries.push(derecha);
    World.add(world, derecha);


    var p = new Particle(36,100,50, false, img2);
    particles.push(p);
    World.add(world, p);

    var p2 = new Caja(random(30,ancho-100),random(30,largo-100),50, false, img3);
    particles.push(p2);
    World.add(world, p2);


    var canvasMouse = Mouse.create(canvas.elt);
    canvasMouse.pixelRatio = pixelDensity();
    var options = {
        mouse: canvasMouse
    }

    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
}

function enemies(){

}


function keyPressed(){
    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){        
        particles[0].izquierda();
    }
    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
        particles[0].derecha();
    }
    if(keyIsDown(UP_ARROW) || keyIsDown(87)){
        particles[0].arriba();
    }
    if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
        particles[0].abajo();
    }

}



function draw(){

    console.log("a");
    background(122, 206, 103);
    image(img,0,0,ancho+120,largo);
    Engine.update(engine);
    for(var i=0; i<particles.length; i++){
        particles[i].show();
        //Body.setVelocity( particles[i], options);
        /*if(circles[i].isOffScreen()){
            circles[i].removeFromWorld();
            circles.splice(i,1);            
            i--;
        }*/
    }
    
    for(var i=0; i<boundaries.length; i++){
        boundaries[i].show();
    }
    

    /*for(var i=0; i<barras.length; i++){         
        barras[i].show(); 
    }*/

    var d = dist(particles[0].body.position.x, particles[0].body.position.y, particles[1].body.position.x, particles[1].body.position.y);
      // now see if distance between two is less than sum of two radius'
      console.log(d,"< ",particles[0].r + particles[1].h/2 + 20);
      console.log(d < particles[0].r + particles[1].r);
        if (d < particles[0].r + particles[1].h/2 +10) {
            particles[1].removeFrowWorld();        
            particles.splice(1,1);        
            removeElements();
            let p = createP(j++);
            p.position(ancho-140,15);

            var p2 = new Caja(random(30,ancho-100),random(30,largo-100),50, false, img3);
            particles.push(p2);
            World.add(world, p2);
        }
   

    //line(particles[0].body.position.x, particles[0].body.position.y,particles[1].body.position.x, particles[1].body.position.y);

    /*if(mConstraint.body){
        var pos = mConstraint.body.position;
        var offset = mConstraint.constraint.pointB;
        var m = mConstraint.mouse.position;
        stroke(0,255,0);  
        line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);

    }*/

}