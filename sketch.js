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
var j=0;

var h = j;
var inicio = false;

var caja;
var nave;
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


    var p = new Nave(36,100,25, false, img2);
    nave = p;
    World.add(world, p);

    var p2 = new Caja(random(30,ancho-100),random(30,largo-100),35, false, img3);
    caja = p2;
    World.add(world, p2);


    var canvasMouse = Mouse.create(canvas.elt);
    canvasMouse.pixelRatio = pixelDensity();
    var options = {
        mouse: canvasMouse
    }

    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);

    
    for(var i=0; i<5; i++){
        var ejey = random(30,largo-100);
        var p = new Particle(random(30,ancho-100),ejey,15, false, img5);
        enemies.push(p);
        World.add(world, p);
    }
}

function keyPressed(){
    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){        
        nave.izquierda();
    }
    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
        nave.derecha();
    }
    if(keyIsDown(UP_ARROW) || keyIsDown(87)){
        nave.arriba();
    }
    if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
        nave.abajo();
    }
}

function draw(){    


    var ran = Math.round(random(1,800));

    if((h%5==0 || ran == 1 ) && (powerups.length<=1)){
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

    nave.show();
    caja.show();

    for(var i=0; i<enemies.length; i++){
        enemies[i].show();
    }
    
    for(var i=0; i<boundaries.length; i++){
        boundaries[i].show();
    }

    for(let i=0; i<enemies.length; i++){
        var de = dist(nave.body.position.x, nave.body.position.y, enemies[i].body.position.x, enemies[i].body.position.y);
        if (de < nave.r + enemies[i].r) {
            location.href = "puntuaciones.html";
            alert("Tu puntaje es de: "+j+" puntos");
        }
    }
    for(let i=0; i<powerups.length; i++){
        var de = dist(nave.body.position.x, nave.body.position.y, powerups[i].body.position.x, powerups[i].body.position.y);
        if (de < nave.r + powerups[i].r) {
            powerups.splice(i,1);
            for(let k=0; k<enemies.length/2; k++){
                console.log("r");
                enemies[k].removeFrowWorld();    
                enemies.splice(k, 1);
            }
        }
    }

    var d = dist(nave.body.position.x, nave.body.position.y, caja.body.position.x, caja.body.position.y);
        if (d < nave.r + caja.h/2 +10) {
            caja.removeFrowWorld();        
            caja = null;     
            removeElements();
            let p = createP(++j);
            
            h=j;
            p.position(ancho-140,15);

            var x = random(30,ancho-100);
            var y = random(30,largo-100);      

            var p2 = new Caja(x,y,35, false, img3);
            caja = p2
            World.add(world, p2);

            for(var i=0; i<5; i++){
                console.log(1);
                var f = random(30,largo-100);
                var g = random(30,ancho-100)

                f+=random(30,100);
                f-=random(30,100);
                f+=random(30,100);
                f-=random(30,100);
                f+=random(30,100);
                f-=random(30,100);

                g+=random(30,100);
                g-=random(30,100);
                g+=random(30,100);
                g-=random(30,100);
            

                var k = new Particle(g,f,15, false, img5);
                enemies.push(k);
                World.add(world, k); 
                k.show();
               
            }
        }
}