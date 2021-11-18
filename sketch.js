//Game States
var PLAY;
var END;
var gameState=play;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;

function preLOAD(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  
  //set collider for sword
  knife.setcollider("rect",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=new createGroup();
  
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mousey;
    knife.x=World.mousex;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      
      //destroy fruit group
      fruitGroup.finish();
      
      knifeSwooshSound.soundon();
      score=+2;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife))
      {
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.framecount%200===0)
  {
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.random(roundoff(100,550));
    monster.velocityX=-(8+(score/10));
    monster.lifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.framecount%80===0)
  {
    position = Math.round(random(1,2));

    fruit=createSprite(400,200,20,20);
    //console.log(position)
    
    //what is happening here?
    if(position==1)
    {
    fruit.x=600;
    fruit.velocityX=-(7+(score/4));
    }
    else if(position==2)
      {
      fruit.x=0;
      fruit.velocityX= (7+(score/4));
      }
    
    
    fruit.scale=0.2;
     //fruit.debug=true;

     //change the images using switch case!
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.random(round(50,550));
   
    
    fruit.lifetime=100;
    
    fruitGroup.add(fruit);
  }
}