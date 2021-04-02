var bgimage1,bgimage2, bgsprite;
var robotimage,robotsprite;
var metroid, metroidimage, metroidgroup;
var lifeline, lifelineimage, lifelinegroup; 
var score=100;
var edges;
var ig;
var gamestate="start";
var l,lgroup;


function preload(){
  bgimage1=loadImage("Scene-1.jpg");
  bgimage2=loadImage("Scene-2.jpg");
  robotimage=loadImage("robo.gif");
  metroidimage=loadImage("stone.png");
  lifelineimage=loadImage("images.png");
}

function setup() {
  createCanvas(800,400);
bgsprite=createSprite(0,0,800,400)
bgsprite.addImage(bgimage1)
bgsprite.velocityX=-3;

robotsprite=createSprite(100,300);
robotsprite.addImage(robotimage)
robotsprite.scale=0.75;




metroidgroup=new Group();
lifelinegroup=new Group();
lgroup=new Group();

edges=createEdgeSprites();

}

function draw() { 



if(frameCount<2000)
bgsprite.addImage(bgimage1)

else
bgsprite.addImage(bgimage2)


if(gamestate==="start")
{
  drawSprites();
  fill("yellow")
  textSize(20)
  text("Robot is stuck in space,\n be careful of the yellow metroids and\n collect the oil for lifeline", 100,50);
  text("PRESS SPACE TO START THE GAME",150,200);
  if(bgsprite.x<200)
  {
    bgsprite.x=400;
  }
  if(keyDown("space"))
  {
    gamestate="play" 
    score=100
  }
}

if(gamestate==="play")
{

  robotsprite.bounceOff(edges[0])
  robotsprite.bounceOff(edges[3])
  robotsprite.bounceOff(edges[1])
  robotsprite.bounceOff(edges[2])

  if(bgsprite.x<200)
  {
    bgsprite.x=400;
  }
if (keyDown("left")){
  robotsprite.velocityX=-5;
}
if (keyDown("right")){
  robotsprite.velocityX=5;
}
makeMetroids();
makelifeline();


if(metroidgroup.isTouching(robotsprite) && score>0)
{
  score=score-5;
  metroidgroup.destroyEach();
}
if(robotsprite.isTouching(lifelinegroup) && score<100){
score=score+10;
lifelinegroup.destroyEach();
}
 drawSprites();
 fill("yellow")
textSize(20)
text("Lifeline:"+score, 500,50)

if(frameCount<2000){
  fill("yellow")
  textSize(30)
  text("Level-1", 700,50);
}
else{
  fill("yellow")
  textSize(30)
  text("Level-2", 700,50);
  if(keyDown("up")){
    robotsprite.y=robotsprite.y-5;
  }
  if(keyDown("down")){
    robotsprite.y=robotsprite.y+5;
  }
  makeLasers()
  if(lgroup.isTouching(robotsprite) )
{
  score=score-5;
  lgroup.destroyEach();
}


}

if(score===0)
{
  gamestate="over"
}

}

if(gamestate==="over")
{
  background("black")
  textSize(20);
  fill("yellow")
  text("game is over",100,100);
  text("press R to replay",100,150);
  if(keyDown("R")||keyDown("r")){
    gamestate="start";
  }
}
}

function makeMetroids(){

  if(frameCount%30===0)
  {
  
    metroid=createSprite(20,0,10,10);
    metroid.addImage(metroidimage);
    metroid.scale=0.1;
    metroid.velocityY=6;
    metroid.x=Math.round(random(20,800));
    metroid.lifetime=300;
    metroid.shapeColor="yellow"
    metroidgroup.add(metroid)
  }

}

function makeLasers(){

  if(frameCount%150===0)
  {
  
    l=createSprite(20,0,100,1);
    l.velocityX=6;
    l.width=Math.round(random(100,150))
    l.y=Math.round(random(200,360));
    l.lifetime=300;
    l.shapeColor="yellow"
    lgroup.add(l)
  }

}

function makelifeline(){

  if(frameCount%500==0)
  {
  
    lifeline=createSprite(20,0,10,10);
    lifeline.addImage(lifelineimage);
    lifeline.scale=0.15;
    lifeline.velocityY=6;
    lifeline.x=Math.round(random(20,500));
    lifeline.lifetime=300;
    lifeline.shapeColor="red"
    lifelinegroup.add(lifeline)
  }

}