const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;
var helicopterImage, helicopterSprite;
var packageImage, packageSprite, package;
var groundSprite, ground;
var leftBox, rightBox, bottomBox;
var hasPackageFallen = false;

function preload()
{
	helicopterImage=loadImage("helicopter.png");
	packageImage=loadImage("package.png");
}

function setup()
{
	createCanvas(800, 700);
	rectMode(CENTER);
	
	engine = Engine.create();
	world = engine.world;
	createWorldObjects();

 	leftBox = new Box(height-410, width/1.31, 20, 100);
	rightBox = new Box(height-190, width/1.31, 20, 100);
	bottomBox = new Box(width/2, height-50, 200, 20);

	createSpriteObjects();

	Engine.run(engine);  
}


function draw() {
	rectMode(CENTER);
	background("black");
	keyPressed();
	
	leftBox.display("red");
	rightBox.display("red");
	bottomBox.display("red");

	drawSprites();
}

function createSpriteObjects()
{
	groundSprite = createSprite(width/2, height-35, width, 10);
	groundSprite.shapeColor = "white";

	packageSprite = createSprite(width/2, 199, 10, 10);
	packageSprite.addImage(packageImage);
	packageSprite.scale = 0.1;

	helicopterSprite = createSprite(width/2, 200, 10, 10);
	helicopterSprite.addImage(helicopterImage)
	helicopterSprite.scale = 0.6;
}

function createWorldObjects()
{
	var package_options =
	{
		restitution: 0.5,
		isStatic: true
	}
	package = Bodies.circle(width/2, 200, 5, package_options);
	World.add(world, package);
	
	var ground_options =
	{
		isStatic: true
	}
	ground = Bodies.rectangle(width/2, 650, width, 10, ground_options);
 	World.add(world, ground);
}

function keyPressed()
{
	if (keyCode === LEFT_ARROW && !hasPackageFallen)
	{
		move(-20);
	}
	else if (keyCode === RIGHT_ARROW && !hasPackageFallen)
	{
		move(20);
	}
	else if (keyCode === DOWN_ARROW)
	{
		hasPackageFallen = true;
		packageSprite.x= package.position.x;
		packageSprite.y= package.position.y;
		Body.setStatic(package, false);
	}
}

function move(value)
{
	helicopterSprite.x = helicopterSprite.x + value;
	packageSprite.x = helicopterSprite.x;
	translation = {x: value, y: 0};
	Body.translate(package, translation);
}