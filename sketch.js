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

var h = j;
var inicio = false;

var particles = [];
var boundaries = [];   
var powerups = [];
var enemies = [];

var ground;

var mConstraint;

var img;
var img2;
var img3;
var img4;
var ancho =  window.innerWidth-30;
var largo = window.innerHeight-30;

function setup(){
    
    img = loadImage('/img/fondo.jpg');
    img2 = loadImage('/img/alien.png');
    img3 = loadImage('/img/senior.png');
    img4 = loadImage('/img/musk.png');
    img5 = loadImage('/img/rock.png');

    engine = Engine.create();
    var canvas = createCanvas(ancho,largo);


    
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    world = engine.world;

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


    var p = new Particle(36,100,25, false, img2);
    particles.push(p);
    World.add(world, p);

    var p2 = new Caja(random(30,ancho-100),random(30,largo-100),35, false, img3);
    particles.push(p2);
    World.add(world, p2);


    var canvasMouse = Mouse.create(canvas.elt);
    canvasMouse.pixelRatio = pixelDensity();
    var options = {
        mouse: canvasMouse
    }

    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);

    
    for(var i=0; i<5; i++){
        var p = new Particle(random(30,ancho-100),random(30,largo-100),15, false, img5);
        enemies.push(p);
        World.add(world, p);
    }
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

    var ran = Math.round(random(1,800));

    if(h%5==0 || ran == 1 ){
        var p2 = new Particle(random(30,ancho-100),random(30,largo-100),15, false, img4);
            powerups.push(p2);
            World.add(world, p2);
        h++;
    }

    

    background(122, 206, 103);
    image(img,0,0,ancho+120,largo);
    Engine.update(engine);

    for(let i=0; i<powerups.length; i++){
        powerups[i].show();
    }

    for(var i=0; i<particles.length; i++){
        particles[i].show();
    }
    for(var i=0; i<enemies.length; i++){
        enemies[i].show();
    }
    
    for(var i=0; i<boundaries.length; i++){
        boundaries[i].show();
    }

    for(let i=0; i<enemies.length; i++){
        var de = dist(particles[0].body.position.x, particles[0].body.position.y, enemies[i].body.position.x, enemies[i].body.position.y);
        if (de < particles[0].r + enemies[i].r) {
            alert("Tu puntaje es de: "+j+" puntos");
        }
    }
    for(let i=0; i<powerups.length; i++){
        var de = dist(particles[0].body.position.x, particles[0].body.position.y, powerups[i].body.position.x, powerups[i].body.position.y);
        if (de < particles[0].r + powerups[i].r) {
            powerups.splice(i,1);
            for(let j=0; j<enemies.length/2; j++){
                enemies[j].removeFrowWorld();    
                enemies.splice(j, 1);
            }
        }
    }

    var d = dist(particles[0].body.position.x, particles[0].body.position.y, particles[1].body.position.x, particles[1].body.position.y);
        if (d < particles[0].r + particles[1].h/2 +10) {
            particles[1].removeFrowWorld();        
            particles.splice(1,1);        
            removeElements();
            let p = createP(j++);
            
            h=j;
            p.position(ancho-140,15);

            var x = random(30,ancho-100);
            var y = random(30,largo-100);

            for(let i=0; i<enemies.length; i++){
                while(!((x>=enemies[i].body.position.x+100 ||
                    x<=enemies[i].body.position.x-100 )&&
                    (y>=enemies[i].body.position.y+100 ||
                    y<=enemies[i].body.position.y-100 ))){
                        console.log("a");
                        var x = random(30,ancho-100);
                        var y = random(30,largo-100);
                    }
            }



            var p2 = new Caja(x,y,35, false, img3);
            particles.push(p2);
            World.add(world, p2);

            for(var i=0; i<5; i++){
                var k = new Particle(random(30,ancho-100),random(30,largo-100),15, false, img5);
                enemies.push(k);
                World.add(world, k);    
            }
        }
}